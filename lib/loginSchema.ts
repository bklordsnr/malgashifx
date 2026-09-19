import { z } from "zod";

export const createLoginSchema = (messages: {
  invalidEmail: string;
  passwordRequired: string;
}) =>
  z.object({
    email: z.string().email(messages.invalidEmail),
    password: z.string().min(1, messages.passwordRequired),
  });