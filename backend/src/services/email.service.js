import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const sendTestEmail = async ({ to, subject, html, from = "onboarding@resend.dev" })=>{
    try {
        const result = await resend.emails.send({
            from,
            to,
            subject,
            html
        });

        return {
            success: true,
            messageId: result.data?.id,
            result
        }
    } catch (err) {
        return {
            success: false,
            error: err.message
        }
    }
};

export default sendTestEmail;