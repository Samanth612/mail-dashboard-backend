import mongoose, { Document } from "mongoose";

interface IMail extends Document {
  id: string;
  name: string;
  email: string;
  subject: string;
  text: string;
  date: Date;
  read: boolean;
  labels: string[];
}

const MailSchema = new mongoose.Schema<IMail>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: Date, required: true },
  read: { type: Boolean, required: true },
  labels: { type: [String], required: true },
});

export const Mail = mongoose.model<IMail>("Mail", MailSchema, "mails");
