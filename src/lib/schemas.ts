import { z } from 'zod';

export const authorizationDialogFormSchema = z.object({
  code: z.string().min(1),
});

export const authenticatorCreateDialogSchema = z.object({
  name: z.string().min(1, 'name must have at least 1 character'),
  key: z.string(),
});

export const authenticatorUpdateDialogSchema = z.object({
  name: z.string().min(1, 'name must have at least 1 character'),
  key: z.string().optional(),
});
