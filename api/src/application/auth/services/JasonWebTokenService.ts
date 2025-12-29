import jwt from "jsonwebtoken";
import env from "../../../configs/env.js";
import { JwtService } from "./JwtService";

export class JsonWebTokenService implements JwtService {
  sign(payload: object): string {
    return jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: "1h",
    });
  }
}
