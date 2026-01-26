import nodemailer from "nodemailer";

function getEnv(name: string, fallback?: string) {
  const v = process.env[name];
  return v && v.trim() ? v.trim() : fallback;
}

export function isEmailConfigured() {
  return Boolean(
    getEnv("SMTP_HOST") &&
      getEnv("SMTP_PORT") &&
      getEnv("SMTP_USER") &&
      getEnv("SMTP_PASS") &&
      getEnv("SMTP_FROM") &&
      getEnv("APP_BASE_URL")
  );
}

export async function sendWorkspaceInviteEmail(args: {
  to: string;
  workspaceName: string;
  inviteUrl: string;
  invitedByUserId: string;
  role: string;
  expiresAtIso: string;
}) {
  if (!isEmailConfigured()) return;

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: String(process.env.SMTP_SECURE ?? "false") === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const from = process.env.SMTP_FROM!;
  const subject = `Convite para o workspace: ${args.workspaceName}`;

  const text = [
    `Voce foi convidado para o workspace "${args.workspaceName}".`,
    `Role: ${args.role}`,
    `Convidado por: ${args.invitedByUserId}`,
    ``,
    `Abra o link para aceitar:`,
    args.inviteUrl,
    ``,
    `Expira em: ${args.expiresAtIso}`
  ].join("\n");

  await transporter.sendMail({
    from,
    to: args.to,
    subject,
    text
  });
}
