export interface FeedbackRepsitoryData {
    type: string,
    comment: string,
    screenshot?: string,
}

export interface FeedbackRepsitory {
    create: (data: FeedbackRepsitoryData) => Promise<void>;
}