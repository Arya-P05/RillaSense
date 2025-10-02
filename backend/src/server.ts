import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

export { app, server };
