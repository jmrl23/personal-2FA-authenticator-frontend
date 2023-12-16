import { z } from 'zod';

export const authorizationDialogFormSchema = z.object({
  code: z.string().min(1),
});
