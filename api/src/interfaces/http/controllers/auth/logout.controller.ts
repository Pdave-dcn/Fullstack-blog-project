import { Request, Response } from "express";
import { getClearCookieConfig } from "@/infrastructure/http/cookies/authCookieConfig";

export const logoutController = (_req: Request, res: Response) => {
  res.clearCookie("token", getClearCookieConfig());

  res.status(200).json({
    message: "Logout successful",
  });
};
