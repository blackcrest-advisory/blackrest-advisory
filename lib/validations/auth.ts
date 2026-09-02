import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Enter Valid Email"),
  password: z.string().min(3, "Password is Required"),
});

export type loginInput = z.infer<typeof loginSchema>;

//=== signup ===//
export const signupSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    industry: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type signupInput = z.infer<typeof signupSchema>;
