import { z } from "zod";

export const registerSchema = z.object({
  name: z.string()
    .min(2, "Magacu waa gaaban yahay")
    .max(50, "Magacu waa dheer yahay")
    .regex(/^[A-Za-z\s]+$/, "Magacu waa inuu ka koobnaadaa xarfo kaliya"),

  email: z.string()
    .email("Invalid email")
    .transform(val => val.toLowerCase().trim()),

  password: z.string().min(6, "passwordku waa inuu ahaadaa ugu yaraan 6 xaraf"),
});