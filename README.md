# Acurra - Project Manager

Script em Python para cadastrar projetos, atividades, acompanhar percentual de avanco (conforme conclusao das atividades) e enviar alertas por e-mail quando ha tarefas proximas do vencimento.

## Requisitos
- Python 3 (`python3` disponivel no PATH)
- Servidor SMTP para envio dos e-mails (ex.: Gmail com SMTP habilitado)

## Como usar
O banco SQLite e criado automaticamente em `data/projects.db`.

### Cadastrar um projeto
```bash
python3 project_manager.py add-project \
  --name "Projeto Exemplo" \
  --developer "DEV Alovado" \
  --start-date 2024-06-01 \
  --end-date 2024-08-31
```

### Cadastrar atividades (ligadas a um projeto)
```bash
# Consulte o ID do projeto pela listagem
python3 project_manager.py add-task \
  --project-id 1 \
  --title "Modelagem inicial" \
  --due-date 2024-06-15
```

### Listar projetos e percentual de avanco
```bash
python3 project_manager.py list-projects
```

### Listar atividades (todas ou de um projeto especifico)
```bash
python3 project_manager.py list-tasks           # todas
python3 project_manager.py list-tasks --project-id 1
```

### Marcar atividade como concluida
```bash
python3 project_manager.py complete-task --task-id 2
```

### Enviar (ou simular) alertas de vencimento
O alerta considera atividades nao concluidas com vencimento nos proximos N dias (default: 3).

1) Defina configuracao SMTP via variaveis de ambiente ou flags:
```bash
export SMTP_HOST=smtp.gmail.com
export SMTP_PORT=587
export SMTP_USER=seuusuario@gmail.com
export SMTP_PASSWORD=suasenhaouappassword
export SMTP_FROM=alertas@exemplo.com
export SMTP_TO=destinatario@exemplo.com
```

2) Execute o envio (ou apenas visualize com `--dry-run`):
```bash
python3 project_manager.py send-reminders --days 2 --dry-run   # apenas mostra
python3 project_manager.py send-reminders --days 2             # envia
```

## Agendar alertas (cron)
Exemplo diario as 9h:
```
0 9 * * * /usr/bin/python3 /Users/joaodamas/ControleProjetos/project_manager.py send-reminders --days 2
```
Ajuste o caminho do Python conforme seu ambiente.

## Observacoes
- Percentual de avanco de cada projeto = (atividades concluidas / atividades totais) * 100. Sem atividades cadastradas, o valor fica 0%.
- Use `--db` para apontar um arquivo SQLite diferente, caso queira separar ambientes.

## Front-end estatico (visual)
- Abra `index.html` no navegador para ver o painel com barra lateral (Dashboard, Meus Paineis, Meus Projetos) e a arvore Cliente -> Projeto -> detalhes.
- Os dados exibidos estao em `app.js` (const `state`). Ajuste clientes, projetos, tarefas e percentuais conforme necessario.
- O layout usa somente HTML/CSS/JS estatico; para conectar ao backend, substitua a carga fixa por uma chamada fetch/axios que leia seus projetos e tarefas (ex.: um endpoint que retorne JSON com cliente/projeto/atividades) e preencha o `state` antes de chamar `renderClientList()` e `renderMain()`.
- Botao “+ Adicionar Projeto” abre modal para cadastrar projeto (cliente, nome, DEV, datas, avanco). O modal de “Cadastrar Funcionarios” apenas grava no array `state.employees`; conecte-o ao backend conforme sua API.

## Firebase (persistencia)
- Preencha `firebaseConfig` em `app.js` com as chaves do seu projeto (API key, authDomain, projectId, etc.). Os scripts do Firebase (app + firestore compat) ja estao importados em `index.html`.
- Quando configurado, a UI passa a ler/gravar no Firestore:
  - Colecao `clients` (campo: `name`)
  - Subcolecao `projects` em cada cliente (campos: `name`, `developer`, `start`, `end`, `progress`)
  - Subcolecao `tasks` em cada projeto (campos: `title`, `due`, `status`)
- Criar projeto/atividade usa Firestore; alterar status no pill tambem atualiza o documento da tarefa.
- Se o Firebase nao estiver configurado, a UI cai no modo local (dados mock em memoria).
