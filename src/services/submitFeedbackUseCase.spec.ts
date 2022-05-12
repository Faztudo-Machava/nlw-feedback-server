import { submitFeedback } from "./submitFeedback"

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const SubmitFeedback = new submitFeedback(
    {create: createFeedbackSpy},
    {sendMail: sendMailSpy}
);

describe('Submit feedback', ()=>{
    it('Should be able to submit a feedback',async ()=>{
        await expect(SubmitFeedback.execute({
            comment: 'BUG',
            type: 'Example type',
            screenshot: 'data:image/png;base64;test.jpg'
        })).resolves.not.toThrow()

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    })

    it('Should not be able to submit a feedback without a type',async ()=>{
        await expect(SubmitFeedback.execute({
            comment: 'BUG',
            type: '',
            screenshot: 'data:image/png;base64;test.jpg'
        })).rejects.toThrow()
    })

    it('Should not be able to submit a feedback without a comment',async ()=>{
        await expect(SubmitFeedback.execute({
            comment: '',
            type: 'Example type',
            screenshot: 'data:image/png;base64;test.jpg'
        })).rejects.toThrow()
    })

    it('Should not be able to submit a feedback without a valid screenshot',async ()=>{
        await expect(SubmitFeedback.execute({
            comment: 'BUG',
            type: 'Example type',
            screenshot: 'test.jpg'
        })).rejects.toThrow()
    })
})