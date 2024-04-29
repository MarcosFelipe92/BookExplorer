import { Author } from "@prisma/client";
import { Request, Response } from "express";
import AuthorService from "../service/AuthorService";

class AuthorController {
  public async create(req: Request, res: Response) {
    const dataAuthor = req.body as Author;

    const { message, author } = await AuthorService.create(dataAuthor);

    return res.json({
      message,
      author,
    });
  }

  public async findById(req: Request, res: Response) {
    const id = Number(req.params.id);

    const { author, message } = await AuthorService.findById(id);

    return res.json({
      message,
      author,
    });
  }

  public async findAll(req: Request, res: Response) {
    const { author, message } = await AuthorService.findAll();

    return res.json({
      message,
      author,
    });
  }

  public async update(req: Request, res: Response) {
    const dataAuthor = req.body as Author;
    const id = Number(req.params.id);

    const { message, author } = await AuthorService.update(id, dataAuthor);

    return res.json({
      message,
      author,
    });
  }

  public async delete(req: Request, res: Response) {
    const id = Number(req.params.id);

    const { message, author } = await AuthorService.delete(id);

    return res.json({
      message,
      author,
    });
  }
}

export { AuthorController };
