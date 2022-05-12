import express from 'express';
import { submitFeedback } from './services/submitFeedback';
import { primaFeedbackRepository } from './database/prisma/prismaFeedbackRepository';
import { NodemailerMailAdapter } from './mail/nodemailer/nodemailer-mail-adapter';

export const routes = express.Router();


routes.post('/feedbacks', async (req, res) => {
  const { comment, type, screenshot } = req.body;

  try {
    const prismaFeedback = new primaFeedbackRepository();

    const nodemailerMailAdaptar = new NodemailerMailAdapter();
  
    const submitFeedbackNew = new submitFeedback(
      prismaFeedback,
      nodemailerMailAdaptar
    );
  
    
    await submitFeedbackNew.execute({
      type,
      comment,
      screenshot
    });
  
    return res.status(201).send();
  } catch (error) {
    console.error(error);
    return res.status(500).send();
  }
});
