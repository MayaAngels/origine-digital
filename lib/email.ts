import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp-relay.brevo.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
  },
});

export async function sendOrderConfirmation(email: string, orderId: string) {
  console.log(`[EMAIL] Pedido ${orderId} confirmado para ${email}`);
}

export async function sendServiceRequestConfirmation(email: string, name: string) {
  console.log(`[EMAIL] Solicitação de serviço de ${name} (${email})`);
}