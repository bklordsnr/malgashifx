import { z } from "zod";

export const createRegisterSchema = (messages: {
  nameTooShort: string;
  nameTooLong: string;
  nameLettersOnly: string;
  invalidEmail: string;
  passwordTooShort: string;
  countryRequired: string;
  numberRequired: string;
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

    country: z
      .string()
      .length(2, messages.countryRequired)
      .transform((value) => value.toUpperCase().trim()),

    number: z
      .string()
      .trim()
      .min(7, messages.numberRequired),

    password: z
      .string()
      .min(6, messages.passwordTooShort),
  });