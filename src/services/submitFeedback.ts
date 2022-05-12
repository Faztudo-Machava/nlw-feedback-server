import { FeedbackRepsitory } from '../database/feedbacks-repository';
import { MailAdapter } from '../mail/mail-adapter';


interface SubmitFeedbackRequest {
    type: string,
    comment: string,
    screenshot?: string,
}

export class submitFeedback {
    constructor(
       private feedbackRepository: FeedbackRepsitory,
       private mailAdapter: MailAdapter

    ) {
    }

    async execute(request: SubmitFeedbackRequest) {
        const { type, comment, screenshot } = request;
        if(screenshot && !screenshot.startsWith('data:image/png;base64')){
            throw new Error("invalid screenshot");
        }

        if(!type){
            throw new Error('Type is required')
        }

        if(!comment){
            throw new Error('Comment is required')
        }

        if(!screenshot){
            throw new Error('Screenshot is required')
        }

        await this.feedbackRepository.create({
            type,
            comment,
            screenshot
        })

        await this.mailAdapter.sendMail({
            subject: "Novo feedback",
            body: [
                `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
                `<p>Tipo do feedback : ${type}</p>`,
                `<p>Comentario : ${comment}</p>`,
                screenshot ? `<img src=${screenshot} alt="Screenshot do feedback" width="150px" height="100px">` : null,
                `</div>`

            ].join('\n')
        })
    }
}