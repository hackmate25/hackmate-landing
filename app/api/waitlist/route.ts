import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Waitlist from "@/models/Waitlist";
import { sendWaitlistMail } from "@/lib/mailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, intent } = body;

    if (!name || !email || !intent) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectDB();

    const existing = await Waitlist.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { message: "Already joined" },
        { status: 409 }
      );
    }

    await Waitlist.create({ name, email, intent });

    await sendWaitlistMail(name, email);

    return NextResponse.json(
      { message: "Joined waitlist successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
