import { User } from "@prisma/client";
import { Request, Response } from "express";
import UserService from "../service/UserService";
import { userValidation } from "../validations/UserValidations";

class UserController {
  public async create(req: Request, res: Response) {
    const dataUser = req.body;
    await userValidation.validate(dataUser);

    const { message, user } = await UserService.create(dataUser);

    return res.json({
      message,
      user,
    });
  }

  public async findById(req: Request, res: Response) {
    const id = Number(req.params.id);

    const { user, message } = await UserService.findById(id);
    return res.json({
      message,
      user,
    });
  }

  public async findAll(req: Request, res: Response) {
    const { user, message } = await UserService.findAll();

    return res.json({
      message,
      user,
    });
  }

  public async update(req: Request, res: Response) {
    const dataUser = req.body as User;
    const id = Number(req.params.id);

    const { message, user } = await UserService.update(id, dataUser);

    return res.json({
      message,
      user,
    });
  }

  public async delete(req: Request, res: Response) {
    const id = Number(req.params.id);

    const { message, user } = await UserService.delete(id);

    return res.json({
      message,
      user,
    });
  }

  public async login(req: Request, res: Response) {
    const body = req.body;
    const { name, email, id, token } = await UserService.login(
      body.email,
      body.password
    );
    return res.json({
      token,
      email,
      name,
      id,
    });
  }

  public async getProfile(req: Request, res: Response) {
    return res.json(req.user);
  }
}

export { UserController };
