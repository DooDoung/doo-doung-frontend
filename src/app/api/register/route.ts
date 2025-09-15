import { NextResponse } from "next/server";
import { z } from "zod";

import { baseSchema } from "@/lib/validators/auth";

const registerSchema = baseSchema.extend({
  confirmPassword: z.string(),
  role: z.enum(["prophet", "customer"]),
  lineId: z.string().optional(),
  birthDate: z.date().optional(),
  birthTime: z.string().optional(),
  zodiacSign: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = registerSchema.parse(body);

    const backendApiUrl = process.env.BACKEND_API_URL + "/account/register";

    const response = await fetch(backendApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedData),
    });

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: result.message || "Registration failed" },
        { status: response.status },
      );
    }

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }

    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 },
    );
  }
}
