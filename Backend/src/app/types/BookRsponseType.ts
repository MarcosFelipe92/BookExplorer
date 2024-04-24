import { Book } from "@prisma/client";
import { IError } from "../interfaces/errors/IError";

export type BookResponseType = {
  error?: IError;
  message: string;
  book: Book | null | Book[];
};
