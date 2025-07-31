import * as z from 'zod';

import { FormRules } from 'shared/lib/formValidation';

export const loginSchema = z
  .object({
    email: z.email(),
    password: z.string().min(6, FormRules.MIN_LENGTH).max(100, FormRules.MAX_LENGTH),
  })
  .required();

export type LoginSchema = z.infer<typeof loginSchema>;
