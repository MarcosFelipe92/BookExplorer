import { Request, Response } from "express";
import BookService from "../service/BookService";
import { Book } from "@prisma/client";

class BookController {
  public async create(req: Request, res: Response) {
    const dataBook = req.body as Book;
    let code = 201;

    const { error, message, book } = await BookService.create(dataBook);

    if (error) {
      code = 400;
    }

    return res.status(code).json({
      error,
      message,
      book,
    });
  }

  public async findById(req: Request, res: Response) {
    const id = Number(req.params.id);
    let code = 200;

    const { book, error, message } = await BookService.findById(id);
    if (error) {
      code = 404;
    }
    return res.status(code).json({
      error,
      message,
      book,
    });
  }

  public async findAll(req: Request, res: Response) {
    const { book, error, message } = await BookService.findAll();

    return res.json({
      error,
      message,
      book,
    });
  }

  public async update(req: Request, res: Response) {
    const dataBook = req.body as Book;
    const id = Number(req.params.id);

    const { error, message, book } = await BookService.update(id, dataBook);

    return res.json({
      error,
      message,
      book,
    });
  }

  public async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    let code = 200;

    const { error, message, book } = await BookService.delete(id);
    if (error) {
      code = 404;
    }
    return res.status(code).json({
      error,
      message,
      book,
    });
  }
}

export { BookController };
