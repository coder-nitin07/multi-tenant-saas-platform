import { z } from "zod";

const invitationSchema = z.object({
    email: z
        .string()
        .email("Please enter a valid email address.")
});

export default invitationSchema;