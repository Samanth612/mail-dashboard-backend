import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes";
import { sendResponse } from "./utils/response";
import mailRoutes from "./routes/mail.routes";
import { authMiddleware } from "./middleware/auth.middleware";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/mails", authMiddleware, mailRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log("Error:", err.message);
  sendResponse(
    res,
    err.status || 500,
    false,
    err.message || "Internal Server Error"
  );
});

export default app;
