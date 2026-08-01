import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Enter Valid Email"),
  password: z.string().min(3, "Password is Required"),
});

export type loginInput = z.infer<typeof loginSchema>;
