import mongoose, { Schema, models } from "mongoose";

export interface IWaitlist {
  name: string;
  email: string;
  intent: string;
  createdAt: Date;
}

const WaitlistSchema = new Schema<IWaitlist>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    intent: { type: String, required: true },
  },
  { timestamps: true }
);

export default models.Waitlist ||
  mongoose.model<IWaitlist>("Waitlist", WaitlistSchema);
