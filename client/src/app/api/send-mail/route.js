import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { text, userEmail, userName } = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: userEmail,
      to: process.env.ADMIN_EMAIL,
      subject: "User Feedback",
      text: `Feedback from user:\n\nName: ${userName}\nEmail: ${userEmail}\n\nMessage:\n${text}`,  
      replyTo: userEmail,
    };

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ message: "Email sent successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ message: "Error sending email" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
