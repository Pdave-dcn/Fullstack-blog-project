import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello from API");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
