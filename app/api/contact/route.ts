import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validators";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedData = contactFormSchema.parse(body);

    // In production, send email / save to CRM
    console.log("[GYM Contact Request Received]:", validatedData);

    return NextResponse.json(
      {
        success: true,
        message: `Thanks, ${validatedData.fullName}. We'll confirm your trial within 24 hours.`,
      },
      { status: 200 }
    );
  } catch (error: any) {
    if (error?.name === "ZodError") {
      return NextResponse.json(
        { success: false, errors: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
