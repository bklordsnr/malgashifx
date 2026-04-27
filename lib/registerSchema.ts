import { z } from "zod";

export const registerSchema = z.object({
  name: z.string()
    .min(2, "Name too short")
    .max(50, "Name too long")
    .regex(/^[A-Za-z\s]+$/, "Name must contain only letters"),

  email: z.string()
    .email("Invalid email")
    .transform(val => val.toLowerCase().trim()),

  password: z.string().min(6, "Password too short 6 char min"),
});