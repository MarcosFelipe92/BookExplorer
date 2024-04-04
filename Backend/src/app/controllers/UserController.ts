import { Request, Response } from "express";
import UserService from "../service/UserService";

class UserController {
  public async create(req: Request, res: Response) {
    const { name, email, password } = req.body;
    let code = 201;

    const { error, message, user } = await UserService.create(
      name,
      email,
      password
    );

    if (error) {
      code = 404;
    }

    return res.status(code).json({
      error,
      message,
      user,
    });
  }

  public async findById(req: Request, res: Response) {
    const id = Number(req.params.id);
    let code = 200;

    const { user, error, message } = await UserService.findById(id);
    if (error) {
      code = 404;
    }
    return res.status(code).json({
      error,
      message,
      user,
    });
  }

  public async findAll(req: Request, res: Response) {
    const { user, error, message } = await UserService.findAll();

    return res.json({
      error,
      message,
      user,
    });
  }

  public async update(req: Request, res: Response) {
    const { name, email, password } = req.body;
    const id = Number(req.params.id);

    const { error, message, user } = await UserService.update(
      id,
      name,
      email,
      password
    );

    return res.json({
      error,
      message,
      user,
    });
  }

  public async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    let code = 200;

    const { error, message, user } = await UserService.delete(id);
    if (error) {
      code = 404;
    }
    return res.status(code).json({
      error,
      message,
      user,
    });
  }

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const result = await UserService.login(email, password);

    return res.json({
      result,
    });
  }

  public async getProfile(req: Request, res: Response) {
    return res.json(req.user);
  }
}

export { UserController };
