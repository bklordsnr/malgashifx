import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Fadlan geli email sax ah"),
  password: z.string().min(1, "Password waa loo baahan yahay"),
});