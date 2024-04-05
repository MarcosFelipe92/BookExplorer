import { User } from "@prisma/client";
import { IError } from "../interfaces/errors/IError";

export type UserResponseType = {
  error: boolean | IError;
  message: string;
  user: User | null | User[];
};
