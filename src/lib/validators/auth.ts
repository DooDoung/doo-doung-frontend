import { z } from "zod";

import { Sex, ZodiacSign } from "@/types/user";

export const baseSchema = z.object({
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
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
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
    .refine((val) => !val || val >= new Date("1970-01-01T00:00:00.000Z"), {
      message: "Birth year must be 1970 or later.",
    }),
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
