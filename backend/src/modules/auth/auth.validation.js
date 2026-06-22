import { z } from "zod";

const registerSchema = z.object({
    email: z.string().email('Invalid Email'),
    password: z.string().min(6, 'Password must be at least 6 characters')
});

const loginSchema = z.object({
    email: z.string().email('Invalid Email'),
    password: z.string().min(6, 'Password must be at least 6 characters')
});

export { registerSchema, loginSchema };