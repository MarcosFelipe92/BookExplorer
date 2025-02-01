import { Author } from "@prisma/client";
import { IError } from "../interfaces/errors/IError";

export type AuthorResponseType = {
  error?: IError;
  message: string;
  author: Author | null | Author[];
};
