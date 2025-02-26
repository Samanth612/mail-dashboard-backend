import { Request, Response } from "express";
import { Mail } from "../models/mail.model";

export const getAllMails = async (req: Request, res: Response) => {
  try {
    const messages = await Mail.find();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving messages" });
  }
};

export const updateMail = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { subject, text, read, labels } = req.body;

    let message = await Mail.findOne({ id: id });
    if (!message) {
      res.status(404).json({ message: "Message not found" });
      return;
    }

    // Ensure "RE:" is prefixed if not already present
    if (!message.subject.startsWith("RE:")) {
      message.subject = `RE: ${message.subject}`;
    }

    message.text = text ?? message.text;
    message.read = read ?? message.read;
    message.labels = labels ?? message.labels;

    await message.save();
    res
      .status(200)
      .json({ message: "Message updated successfully", data: message });
  } catch (error) {
    console.error("Error updating message:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteMail = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const deletedMessage = await Mail.findOneAndDelete({ id: id });

    if (!deletedMessage) {
      res.status(404).json({ message: "Message not found" });
      return;
    }

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
