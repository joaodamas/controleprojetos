import argparse
import datetime as dt
import os
import smtplib
import sqlite3
import ssl
from email.message import EmailMessage
from pathlib import Path
from typing import Iterable, List, Optional


DB_PATH = Path(__file__).parent / "data" / "projects.db"


def ensure_db(conn: sqlite3.Connection) -> None:
    """Create required tables if they do not exist."""
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS projects (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            developer TEXT NOT NULL,
            start_date TEXT NOT NULL,
            end_date TEXT NOT NULL
        )
        """
    )
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            project_id INTEGER NOT NULL,
            title TEXT NOT NULL,
            due_date TEXT NOT NULL,
            status TEXT NOT NULL DEFAULT 'pending',
            completed_at TEXT,
            FOREIGN KEY(project_id) REFERENCES projects(id)
        )
        """
    )
    conn.commit()


def get_conn(db_path: Path) -> sqlite3.Connection:
    db_path.parent.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    ensure_db(conn)
    return conn


def parse_date(raw: str) -> str:
    """Normalize date strings to YYYY-MM-DD and validate."""
    try:
        parsed = dt.datetime.strptime(raw, "%Y-%m-%d").date()
    except ValueError as exc:
        raise argparse.ArgumentTypeError(f"Data invalida (use YYYY-MM-DD): {raw}") from exc
    return parsed.isoformat()


def add_project(args: argparse.Namespace) -> None:
    conn = get_conn(args.db)
    conn.execute(
        """
        INSERT INTO projects (name, developer, start_date, end_date)
        VALUES (?, ?, ?, ?)
        """,
        (args.name, args.developer, args.start_date, args.end_date),
    )
    conn.commit()
    print("Projeto criado.")


def add_task(args: argparse.Namespace) -> None:
    conn = get_conn(args.db)
    project = conn.execute(
        "SELECT id FROM projects WHERE id = ?", (args.project_id,)
    ).fetchone()
    if not project:
        raise SystemExit(f"Projeto {args.project_id} nao encontrado.")
    conn.execute(
        """
        INSERT INTO tasks (project_id, title, due_date)
        VALUES (?, ?, ?)
        """,
        (args.project_id, args.title, args.due_date),
    )
    conn.commit()
    print("Atividade criada.")


def complete_task(args: argparse.Namespace) -> None:
    conn = get_conn(args.db)
    now = dt.datetime.utcnow().isoformat()
    updated = conn.execute(
        """
        UPDATE tasks
        SET status = 'done', completed_at = ?
        WHERE id = ? AND status != 'done'
        """,
        (now, args.task_id),
    ).rowcount
    conn.commit()
    if updated:
        print("Atividade marcada como concluida.")
    else:
        print("Nenhuma atividade atualizada (id invalido ou ja concluida).")


def project_progress(conn: sqlite3.Connection, project_id: int) -> float:
    totals = conn.execute(
        """
        SELECT
            COUNT(*) AS total,
            SUM(CASE WHEN status = 'done' THEN 1 ELSE 0 END) AS done
        FROM tasks
        WHERE project_id = ?
        """,
        (project_id,),
    ).fetchone()
    total = totals["total"] or 0
    done = totals["done"] or 0
    return (done / total * 100.0) if total else 0.0


def list_projects(args: argparse.Namespace) -> None:
    conn = get_conn(args.db)
    projects = conn.execute(
        "SELECT id, name, developer, start_date, end_date FROM projects ORDER BY id DESC"
    ).fetchall()
    if not projects:
        print("Nenhum projeto cadastrado.")
        return
    for proj in projects:
        progress = project_progress(conn, proj["id"])
        print(
            f"[{proj['id']}] {proj['name']} | Dev: {proj['developer']} | "
            f"Inicio: {proj['start_date']} | Fim: {proj['end_date']} | "
            f"Avanco: {progress:.0f}%"
        )


def list_tasks(args: argparse.Namespace) -> None:
    conn = get_conn(args.db)
    tasks = conn.execute(
        """
        SELECT t.id, t.title, t.due_date, t.status, p.name AS project_name
        FROM tasks t
        JOIN projects p ON p.id = t.project_id
        WHERE (? IS NULL OR t.project_id = ?)
        ORDER BY t.due_date ASC
        """,
        (args.project_id, args.project_id),
    ).fetchall()
    if not tasks:
        print("Nenhuma atividade encontrada.")
        return
    for tsk in tasks:
        print(
            f"[{tsk['id']}] ({tsk['project_name']}) {tsk['title']} | "
            f"Vencimento: {tsk['due_date']} | Status: {tsk['status']}"
        )


def due_tasks(conn: sqlite3.Connection, within_days: int) -> Iterable[sqlite3.Row]:
    today = dt.date.today()
    limit = today + dt.timedelta(days=within_days)
    return conn.execute(
        """
        SELECT t.id, t.title, t.due_date, t.status, p.name AS project_name, p.developer
        FROM tasks t
        JOIN projects p ON p.id = t.project_id
        WHERE t.status != 'done'
          AND date(t.due_date) <= date(?)
        ORDER BY t.due_date ASC
        """,
        (limit.isoformat(),),
    ).fetchall()


def send_email(
    host: str,
    port: int,
    username: Optional[str],
    password: Optional[str],
    from_addr: str,
    to_addr: str,
    subject: str,
    body: str,
) -> None:
    message = EmailMessage()
    message["From"] = from_addr
    message["To"] = to_addr
    message["Subject"] = subject
    message.set_content(body)

    context = ssl.create_default_context()
    with smtplib.SMTP(host, port) as server:
        server.starttls(context=context)
        if username:
            server.login(username, password or "")
        server.send_message(message)


def reminder_body(tasks: Iterable[sqlite3.Row], within_days: int) -> str:
    lines = [
        f"Atividades com vencimento nos proximos {within_days} dias:",
        "",
    ]
    for task in tasks:
        lines.append(
            f"- [{task['id']}] {task['title']} (Projeto: {task['project_name']}, "
            f"Responsavel: {task['developer']}, Vencimento: {task['due_date']})"
        )
    return "\n".join(lines)


def send_reminders(args: argparse.Namespace) -> None:
    conn = get_conn(args.db)
    tasks = list(due_tasks(conn, args.days))
    if not tasks:
        print("Nenhuma atividade proxima do vencimento.")
        return

    target = args.to or os.environ.get("SMTP_TO")
    if not target:
        raise SystemExit("Defina --to ou variavel de ambiente SMTP_TO.")
    from_addr = args.from_addr or os.environ.get("SMTP_FROM") or target
    host = args.smtp_host or os.environ.get("SMTP_HOST", "smtp.gmail.com")
    port = int(args.smtp_port or os.environ.get("SMTP_PORT", 587))
    username = args.smtp_user or os.environ.get("SMTP_USER")
    password = args.smtp_password or os.environ.get("SMTP_PASSWORD")

    body = reminder_body(tasks, args.days)
    if args.dry_run:
        print(body)
        return

    send_email(
        host=host,
        port=port,
        username=username,
        password=password,
        from_addr=from_addr,
        to_addr=target,
        subject="Atividades proximas do vencimento",
        body=body,
    )
    print(f"E-mail enviado para {target}.")


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Controle de projetos e atividades com alertas de vencimento."
    )
    parser.add_argument(
        "--db",
        type=Path,
        default=DB_PATH,
        help=f"Caminho para o banco SQLite (default: {DB_PATH})",
    )
    sub = parser.add_subparsers(dest="command", required=True)

    proj = sub.add_parser("add-project", help="Cadastrar um projeto.")
    proj.add_argument("--name", required=True, help="Nome do projeto.")
    proj.add_argument("--developer", required=True, help="DEV responsavel.")
    proj.add_argument("--start-date", required=True, type=parse_date, help="YYYY-MM-DD")
    proj.add_argument("--end-date", required=True, type=parse_date, help="YYYY-MM-DD")
    proj.set_defaults(func=add_project)

    task = sub.add_parser("add-task", help="Cadastrar uma atividade.")
    task.add_argument("--project-id", type=int, required=True, help="ID do projeto.")
    task.add_argument("--title", required=True, help="Descricao da atividade.")
    task.add_argument("--due-date", required=True, type=parse_date, help="YYYY-MM-DD")
    task.set_defaults(func=add_task)

    done = sub.add_parser("complete-task", help="Marcar atividade como concluida.")
    done.add_argument("--task-id", type=int, required=True, help="ID da atividade.")
    done.set_defaults(func=complete_task)

    lstp = sub.add_parser("list-projects", help="Listar projetos.")
    lstp.set_defaults(func=list_projects)

    lstt = sub.add_parser("list-tasks", help="Listar atividades (opcional por projeto).")
    lstt.add_argument("--project-id", type=int, help="Filtrar por ID do projeto.")
    lstt.set_defaults(func=list_tasks)

    remind = sub.add_parser("send-reminders", help="Enviar alerta de atividades proximas.")
    remind.add_argument(
        "--days",
        type=int,
        default=3,
        help="Quantos dias para frente considerar (default: 3).",
    )
    remind.add_argument("--to", dest="to", help="Destinatario do e-mail.")
    remind.add_argument("--from", dest="from_addr", help="Remetente do e-mail.")
    remind.add_argument("--smtp-host", help="Servidor SMTP (default: smtp.gmail.com).")
    remind.add_argument("--smtp-port", help="Porta SMTP (default: 587).")
    remind.add_argument("--smtp-user", help="Usuario SMTP.")
    remind.add_argument("--smtp-password", help="Senha SMTP.")
    remind.add_argument(
        "--dry-run",
        action="store_true",
        help="Apenas mostra o corpo do e-mail (nao envia).",
    )
    remind.set_defaults(func=send_reminders)

    return parser


def main(argv: Optional[List[str]] = None) -> None:
    parser = build_parser()
    args = parser.parse_args(argv)
    args.func(args)


if __name__ == "__main__":
    main()
