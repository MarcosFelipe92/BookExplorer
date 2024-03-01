import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import UserRepository from "../repositories/UserRepository";
import { UnauthorizedError } from "../helpers/api-errors";

type JwtPayload = {
  id: number;
};

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new UnauthorizedError("Usuário não autorizado");
  }

  const token = authorization.replace("Bearer ", "");

  try {
    const { id } = jwt.verify(
      token,
      process.env.JWT_SECRET ?? ""
    ) as JwtPayload;

    const user = await UserRepository.findById(id);

    if (!user) {
      throw new UnauthorizedError("Usuário não autorizado");
    }

    req.user = user;

    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new UnauthorizedError("Token expirado");
    } else if (error instanceof JsonWebTokenError) {
      throw new UnauthorizedError("Token inválido");
    } else {
      throw error;
    }
  }
};
