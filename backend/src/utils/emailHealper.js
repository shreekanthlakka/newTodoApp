import nodemailer from "nodemailer";

//create a transporter

const mailHealper = async (option) => {
    const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_HOST,
        port: process.env.MAILTRAP_PORT,
        auth: {
            user: process.env.MAILTRAP_USER,
            pass: process.env.MAILTRAP_PASS,
        },
    });

    const message = {
        from: "sree@tshirtapp.com",
        to: option.email,
        subject: option.subject,
        text: option.message,
    };

    const info = await transporter.sendMail(message);
};

export default mailHealper;
