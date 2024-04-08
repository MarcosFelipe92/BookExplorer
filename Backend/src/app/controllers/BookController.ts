import { Book } from "@prisma/client";
import axios from "axios";
import { Request, Response } from "express";
import { BookVolume } from "../interfaces/books";
import BookService from "../service/BookService";

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

  public async getBooksFromGoogleApi(req: Request, res: Response) {
    const response = await axios.get(
      "https://www.googleapis.com/books/v1/volumes?q=search+query"
    );

    const books = response.data.items.map((item: BookVolume) => {
      return {
        id: item.id,
        title: item.volumeInfo.title,
        author: item.volumeInfo.authors
          ? item.volumeInfo.authors.join(", ")
          : "Unknown Author",
      };
    });
    return res.json(books);
  }

  public async getBooksSearchByParamsGoogleApi(req: Request, res: Response) {
    const { title, author } = req.body;
    const response = await axios.get(
      "https://www.googleapis.com/books/v1/volumes",
      {
        params: {
          q: `intitle:${title} inauthor:${author}`,
        },
      }
    );

    const books = response.data.items.map((item: BookVolume) => {
      return {
        id: item.id,
        title: item.volumeInfo.title,
        author: item.volumeInfo.authors
          ? item.volumeInfo.authors.join(", ")
          : "Unknown Author",
      };
    });
    return res.json(books);
  }
}

export { BookController };
