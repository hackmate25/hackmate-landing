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
    subject: "Welcome to HackMate — You’re In 🚀",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111;">
        <h2>Hey ${name} 👋</h2>

        <p>
          Welcome to <strong>HackMate</strong> — you’re officially on the waitlist! 🎉
        </p>

        <p>
          HackMate is built for developers who don’t want to build alone during hackathons.
          Our goal is simple: help you connect with people who actually match your skills,
          interests, and hackathon mindset.
        </p>

        <p>
          As an early member, you’ll get <strong>priority access</strong> when matching goes live,
          along with early features designed to make team formation faster, smoother, and
          way less chaotic.
        </p>

        <p>
          We’re working behind the scenes to bring this to life, and we can’t wait to help you
          find the right people to build something amazing with.
        </p>

        <p>
          🚀 More updates coming soon — stay tuned.
        </p>

        <br />

        <p>
          See you soon,<br />
          <strong>Team HackMate</strong>
        </p>
      </div>
    `,
  });
}
