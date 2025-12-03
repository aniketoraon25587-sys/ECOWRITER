// models/Payment.ts
import mongoose, { Schema, Document, models, model } from "mongoose";

export type PaymentStatus = "pending" | "approved" | "rejected";

export interface IPayment extends Document {
  name: string;
  email: string;
  upiId: string;
  transactionId?: string;
  amount: number;
  plan: "pro" | "business";
  screenshotUrl: string;
  status: PaymentStatus;
  adminNote?: string;
  createdAt: Date;
  verifiedAt?: Date | null;
}

const PaymentSchema = new Schema<IPayment>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    upiId: { type: String, required: true },
    transactionId: { type: String },
    amount: { type: Number, required: true },
    plan: { type: String, enum: ["pro", "business"], required: true },
    screenshotUrl: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    adminNote: { type: String },
    verifiedAt: { type: Date, default: null },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  }
);

export const Payment =
  (models.Payment as mongoose.Model<IPayment>) ||
  model<IPayment>("Payment", PaymentSchema);