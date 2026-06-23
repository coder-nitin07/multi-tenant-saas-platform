import { z } from "zod";

const organizationSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters.')
});

export { organizationSchema };