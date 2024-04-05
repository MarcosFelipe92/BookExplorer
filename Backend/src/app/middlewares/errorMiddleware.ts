import { NextFunction, Request, Response } from "express";
import { ApiError } from "../helpers/api-errors";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const errorMiddleware = (
  error: Error & Partial<ApiError>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = error.statusCode ?? 500;
  let errorMessage = error.message;

  if (error instanceof PrismaClientKnownRequestError) {
    if (error.code === "P2003") {
      statusCode = 400;
      errorMessage =
        "O usuário não pode ser excluído porque está associado a outros recursos.";
    }
  }
  return res.status(statusCode).json({ message: errorMessage });
};
