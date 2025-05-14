import { Response } from "express";

export const handleServerError = (
  consoleMsg: string,
  error: unknown,
  res: Response
) => {
  console.error(`${consoleMsg}:`, error);
  return res.status(500).json({ message: "Server error." });
};
