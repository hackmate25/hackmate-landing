import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendWaitlistMail(name: string, email: string) {
  await transporter.sendMail({
    from: `"HackMate 🚀" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Welcome to HackMate Early Access",
    html: `
      <div style="font-family: Arial, sans-serif">
        <h2>Hey ${name} 👋</h2>
        <p>You’re officially on the <strong>HackMate</strong> waitlist.</p>
        <p>
          We’ll notify you when matching goes live so you can
          find the right people to build with.
        </p>
        <br />
        <p>— Team HackMate 🚀</p>
      </div>
    `,
  });
}
