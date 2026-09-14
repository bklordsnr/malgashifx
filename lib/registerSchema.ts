import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Name is too short")
    .max(50, "Name is too long")
    .regex(/^[A-Za-z\s]+$/, "Name must contain letters only"),

  email: z
    .string()
    .email("Please enter a valid email address")
    .transform((value) => value.toLowerCase().trim()),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});