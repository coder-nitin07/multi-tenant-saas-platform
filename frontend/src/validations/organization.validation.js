import { z } from 'zod';

const organizationSchema = z.object({
    name: z
        .string()
        .min(3, 'Please name should be atleast 3 characters long.'),

    description: z
        .string()
        .min(10, 'Please desciption should be atleast 10 characters long.')
});

export default organizationSchema;