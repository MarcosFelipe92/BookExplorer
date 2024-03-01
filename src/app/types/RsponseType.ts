import { User } from "@prisma/client";
import { IError } from "../interfaces/errors/IError";

export type ResponseType = {
  error: boolean | IError;
  message: string;
  user: User | null | User[];
};
