import { z } from "zod";

export const SignupSchema = z.object({
  username: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const CreateAccountSchema = z.object({
  name: z.string().min(1),
  type: z.string().optional(),
  currency: z.string().optional(),
  balance: z.number().optional(),
});

export const CreateTransactionSchema = z.object({
  type: z.enum(["income", "expense", "transfer"]),
  amount: z.number().positive(),
  currency: z.string().min(1),
  date: z
    .string()
    .refine((s) => !Number.isNaN(Date.parse(s)), { message: "Invalid date" }),
  account: z.string().optional(),
  targetAccount: z.string().optional(),
  category: z.string().optional(),
  description: z.string().optional(),
  isRecurring: z.boolean().optional(),
  recurrence: z
    .object({
      interval: z.enum(["monthly", "weekly", "yearly"]),
      every: z.number().min(1),
    })
    .optional(),
});

export const SummaryQuerySchema = z.object({
  year: z.string().regex(/^\d{4}$/),
  month: z.string().regex(/^\d{1,2}$/),
});
