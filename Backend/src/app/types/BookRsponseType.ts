import { Book } from "@prisma/client";
import { IError } from "../interfaces/errors/IError";

export type BookResponseType = {
  error: boolean | IError;
  message: string;
  book: Book | null | Book[];
};
