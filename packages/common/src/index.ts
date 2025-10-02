import z, { email } from 'zod';

export const userSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string().min(6).max(100)
});