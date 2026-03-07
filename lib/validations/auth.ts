import { z } from "zod";

export const signInSchema = z.object({
  userId: z.union([
    z.string().email("Invalid email address"),
    z.string().min(3, "Invalid user id"),
  ]),
  password: z.string().min(3, "Password must be at least 3 characters."),
});

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const registerSchema = z.object({
  fullName: z.string().trim().min(1, "Fullname is required"),
  username: z
    .string()
    .trim()
    .min(1, "Username is required")
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username must be at most 20 characters long")
    .regex(
      /^[a-zA-Z0-9_.-]+$/,
      "Username can only contain letters, numbers and (., _, -)"
    ),
  email: z
    .string()
    .min(1, "Email is required")
    .refine((value) => emailRegex.test(value), "Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters long"),
  avatar: z
    .string({ message: "Please upload a profile photo" })
    .min(1, "Please upload a profile photo"),
  coverImage: z.string().optional(),
});

export type SignInFormData = z.infer<typeof signInSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
