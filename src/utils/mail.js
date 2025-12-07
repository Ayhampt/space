import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendMail = async (options) => {
  const mailGen = new Mailgen({
    theme: "default",
    product: {
      name: "space",
      link: "https://space.studio",
    },
  });

  const emailText = mailGen.generatePlaintext(options.mailgenContent);
  const emailHtml = mailGen.generate(options.mailgenContent);

  const transpoter = nodemailer.createTransport({
    host: process.env.MAILTRAP_SMTP_HOST,
    port: process.env.MAILTRAP_SMTP_PORT,
    auth: {
      user: process.env.MAILTRAP_SMTP_USER,
      pass: process.env.MAILTRAP_SMTP_PASS,
    },
  });
  const mail = {
    from: "mail.space@studio.in",
    to: options.email,
    subject: options.subject,
    text: emailText,
    html: emailHtml
  };

  try {
    await transpoter.sendMail(mail)
  } catch (error) {
    console.error("❌ Email Service Failed");
    console.error("Error",error)
  }
};

const emailVerificationMailgenContent = (username, verificationUrl) => {
  return {
    body: {
      name: username,
      info: "Welcome to our App! we're excited to have you on board.",
      action: {
        instructions:
          "To verify your email please click on the following button",
        button: {
          color: "#1AAFEA",
          text: "Verify your email",
          link: verificationUrl,
        },
      },
      outro: "Need help, or have questions ? please contact ayham@space.in",
    },
  };
};

const forgotPasswordMailgenContent = (username, PasswordResetUrl) => {
  return {
    body: {
      name: username,
      info: "We got a request to reset your password",
      action: {
        instructions: "To reset click on the button bellow",
        button: {
          color: "#22BC66",
          text: "Reset password",
          link: PasswordResetUrl,
        },
      },
      outro: "Need help, or have questions ? please contact ayham@space.in",
    },
  };
};

export { emailVerificationMailgenContent, forgotPasswordMailgenContent ,sendMail};
