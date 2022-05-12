import { prisma } from "../../prisma";
import { FeedbackRepsitory, FeedbackRepsitoryData } from "../feedbacks-repository";

export class primaFeedbackRepository implements FeedbackRepsitory{
    async create({comment, type, screenshot}: FeedbackRepsitoryData){
        await prisma.feedback.create({
            data: {
              comment,
              type,
              screenshot
            }
          })
    };
}