import * as z from 'zod';

export const loginSchema = z
  .object({
    email: z.email(),
    password: z.string().min(6).max(100),
  })
  .required();

export type LoginSchema = z.infer<typeof loginSchema>;
