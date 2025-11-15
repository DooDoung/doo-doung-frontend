import { z } from "zod";

import { Sex, ZodiacSign } from "@/types/user";

export const baseSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name must not exceed 50 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name must not exceed 50 characters"),
  email: z
    .string()
    .email("Invalid email address")
    .min(10, "Email must be at least 10 characters")
    .max(100, "Email must not exceed 100 characters")
    .refine((email) => email.endsWith("@gmail.com"), {
      message: "Email must be a @gmail.com address",
    }),
  username: z
    .string()
    .min(5, "Username must be at least 5 characters")
    .max(30, "Username must not exceed 30 characters")
    .regex(
      /^[a-zA-Z0-9]+$/,
      "Username must contain only English letters and numbers",
    ),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(72, "Password cannot exceed 72 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#%]).+$/,
      "Password must include an uppercase letter, a lowercase letter, a number, and a special character (@, #, %)",
    ),
  confirmPassword: z.string(),
  phoneNumber: z
    .string()
    .regex(/^[0-9]{9,10}$/, "Please enter a valid 9 or 10-digit phone number"),
  gender: z
    .union([z.nativeEnum(Sex), z.literal("")])
    .refine((val) => val !== "", { message: "Please select a gender" }),
});

export const customerSchema = baseSchema.extend({
  role: z.literal("customer"),
  birthDate: z
    .union([z.date(), z.undefined()])
    .refine((val) => val !== undefined, { message: "Please pick a birth date" })
    .refine(
      (val) => {
        if (!val) return false;
        const today = new Date();
        const hundredYearsAgo = new Date(
          today.getFullYear() - 100,
          today.getMonth(),
          today.getDate(),
        );
        return val >= hundredYearsAgo;
      },
      {
        message: "Birth date cannot be more than 100 years ago.",
      },
    )
    .refine(
      (val) => {
        if (!val) return false;
        const today = new Date();
        const thirteenYearsAgo = new Date(
          today.getFullYear() - 13,
          today.getMonth(),
          today.getDate(),
        );
        return val <= thirteenYearsAgo;
      },
      {
        message: "You must be at least 13 years old.",
      },
    ),
  birthTime: z.string().min(1, "Birth time is required"),
  zodiacSign: z
    .union([z.nativeEnum(ZodiacSign), z.literal("")])
    .refine((val) => val !== "", { message: "Please select a zodiac sign" }),
});

export const prophetSchema = baseSchema.extend({
  role: z.literal("prophet"),
  lineId: z.string().min(3, "LINE ID must be at least 3 characters"),
});

export const RegisterValidator = z
  .discriminatedUnion("role", [customerSchema, prophetSchema])
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof RegisterValidator>;
