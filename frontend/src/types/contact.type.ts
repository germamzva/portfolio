export type Contact = {
    name: string;
    email: string;
    message: string;
};

export type ContactSubmission = Contact & {
    captchaAnswer: string;
    captchaToken: string;
};