import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
  sub: string;
}

export async function EnsureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new AppError("Token missing", 401);

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      "9d9311b994cff3498ddeb5094e2b3941"
    ) as IPayload;

    const usersRepository = new UsersRepository();
    const userExists = usersRepository.findById(user_id);

    if (!userExists) throw new AppError("User does not exists", 401);

    next();
  } catch {
    throw new AppError("Invalid token", 401);
  }
}
