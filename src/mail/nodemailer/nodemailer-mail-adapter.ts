import { MailAdapter, MailAdapterData } from "../mail-adapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "b9c9d1708b4023",
        pass: "353b4e75fec01e"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({ subject, body }: MailAdapterData) {
        await transport.sendMail({
            from: 'Equipe do feedget <oi@feedget.com>',
            to: 'Fausto Machava <fasthymachava12@gmail.com>',
            subject: subject,
            html: body
        });
    };
}