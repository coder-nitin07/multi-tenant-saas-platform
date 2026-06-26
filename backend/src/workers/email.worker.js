import { Worker } from "bullmq";
import sendEmail from "../services/email.service.js";
import { connection } from "../config/redis.js";

const emailWorker = new Worker(
    'email-queue',
    async (job) =>{
        console.log(`Processing the Job ${ job.id }`);

        await sendEmail(job.data);

        console.log('Email Sent');
    },
    {
        connection
    }
);

export default emailWorker;