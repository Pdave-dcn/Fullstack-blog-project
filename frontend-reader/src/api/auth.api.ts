import handleZodValidationError from "@/utils/zodErrorHandler";
import { AuthResponseSchema, type FormData } from "@/zodSchemas/auth.zod";

import api from "./axios";

const login = async (data: FormData) => {
  try {
    const res = await api.post("/users/login", data);

    const validatedData = AuthResponseSchema.parse(res.data);

    return validatedData;
  } catch (error) {
    handleZodValidationError(error, "login");
    throw error;
  }
};

const signup = async (data: FormData) => {
  try {
    const res = await api.post("/users/signup", data);

    const validatedData = AuthResponseSchema.parse(res.data);

    return validatedData;
  } catch (error) {
    handleZodValidationError(error, "signup");
    throw error;
  }
};

const logOut = async () => {
  const res = await api.post("/users/logout", {});
  return res.data;
};

export { login, signup, logOut };
