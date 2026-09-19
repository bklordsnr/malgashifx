import { z } from "zod";

export const createRegisterSchema = (messages: {
  nameTooShort: string;
  nameTooLong: string;
  nameLettersOnly: string;
  invalidEmail: string;
  passwordTooShort: string;
}) =>
  z.object({
    name: z
      .string()
      .min(2, messages.nameTooShort)
      .max(50, messages.nameTooLong)
      .regex(/^[A-Za-z\s]+$/, messages.nameLettersOnly),

    email: z
      .string()
      .email(messages.invalidEmail)
      .transform((value) => value.toLowerCase().trim()),

    password: z
      .string()
      .min(6, messages.passwordTooShort),
  });