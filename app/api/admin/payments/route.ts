import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "../../../../lib/db";
import { Payment } from "../../../../models/Payment";

export async function GET() {
  await connectToDatabase();

  const payments = await Payment.find({})
    .sort({ createdAt: -1 })
    .lean()
    .exec();

  return NextResponse.json({ payments });
}

export async function PATCH(req: NextRequest) {
  try {
    await connectToDatabase();

    const { id, action, adminNote } = await req.json();

    if (!id || !["approve", "reject"].includes(action)) {
      return NextResponse.json(
        { error: "Invalid request" },
        { status: 400 }
      );
    }

    const payment = await Payment.findById(id);
    if (!payment) {
      return NextResponse.json(
        { error: "Payment not found" },
        { status: 404 }
      );
    }

    if (action === "approve") {
      payment.status = "approved";
      payment.verifiedAt = new Date();
      if (adminNote) payment.adminNote = adminNote;
      // TODO: activate user subscription here (link user by email)
      // TODO: send confirmation email / WhatsApp
    } else if (action === "reject") {
      payment.status = "rejected";
      payment.verifiedAt = null;
      if (adminNote) payment.adminNote = adminNote;
      // TODO: send rejection email / WhatsApp
    }

    await payment.save();

    return NextResponse.json({ payment });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}