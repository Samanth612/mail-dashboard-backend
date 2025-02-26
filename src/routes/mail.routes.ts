import express from "express";
import {
  deleteMail,
  getAllMails,
  updateMail,
} from "../controllers/mail.controller";

const router = express.Router();

router.get("/", getAllMails);
router.put("/:id", updateMail);
router.delete("/:id", deleteMail);

export default router;
