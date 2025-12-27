import handleZodValidationError from "@/utils/zodErrorHandler";
import { AuthResponseSchema, type LoginFormData } from "@/zodSchemas/auth.zod";

import api from "./axios";

const login = async (data: LoginFormData) => {
  try {
    const res = await api.post("/users/login", data);

    const validatedData = AuthResponseSchema.parse(res.data);

    return validatedData;
  } catch (error) {
    handleZodValidationError(error, "login");
    throw error;
  }
};

const loginGuest = async () => {
  try {
    const res = await api.post("/users/guest");

    const validatedData = AuthResponseSchema.parse(res.data);

    return validatedData;
  } catch (error) {
    handleZodValidationError(error, "loginGuest");
    throw error;
  }
};

const logOut = async () => {
  const res = await api.post("/users/logout", {});
  return res.data;
};

export { login, loginGuest, logOut };
