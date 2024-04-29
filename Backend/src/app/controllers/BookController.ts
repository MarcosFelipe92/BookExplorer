import { Book } from "@prisma/client";
import axios from "axios";
import { Request, Response } from "express";
import { BookVolume } from "../interfaces/books";
import BookService from "../service/BookService";
import { bookValidation } from "../validations/BookValidation";

class BookController {
  public async create(req: Request, res: Response) {
    const { dataAuthor, ...dataBook } = req.body;
    dataBook as Book;
    await bookValidation.validate(dataBook);

    const { message, book } = await BookService.create(dataBook, dataAuthor);

    return res.json({
      message,
      book,
    });
  }

  public async findById(req: Request, res: Response) {
    const id = Number(req.params.id);

    const { book, message } = await BookService.findById(id);

    return res.json({
      message,
      book,
    });
  }

  public async findAll(req: Request, res: Response) {
    const { book, message } = await BookService.findAll();

    return res.json({
      message,
      book,
    });
  }

  public async update(req: Request, res: Response) {
    const dataBook = req.body as Book;
    const id = Number(req.params.id);

    const { message, book } = await BookService.update(id, dataBook);

    return res.json({
      message,
      book,
    });
  }

  public async delete(req: Request, res: Response) {
    const id = Number(req.params.id);

    const { message, book } = await BookService.delete(id);

    return res.json({
      message,
      book,
    });
  }

  public async getBooksFromGoogleApi(req: Request, res: Response) {
    const response = await axios.get(
      "https://www.googleapis.com/books/v1/volumes?q=search+query&maxResults=40&startIndex=0"
    );

    const books = response.data.items.map((item: BookVolume) => {
      return {
        id: item.id,
        title: item.volumeInfo.title,
        author: item.volumeInfo.authors
          ? item.volumeInfo.authors.join(", ")
          : "Unknown Author",
        description: item.volumeInfo.description
          ? item.volumeInfo.description
          : "",
        language: item.volumeInfo.language ? item.volumeInfo.language : "",
        images: item.volumeInfo.imageLinks,
      };
    });
    return res.json(books);
  }

  public async getBooksSearchByParamsGoogleApi(req: Request, res: Response) {
    const { title, author, limit } = req.query;
    const response = await axios.get(
      "https://www.googleapis.com/books/v1/volumes",
      {
        params: {
          q: `intitle:${title} inauthor:${author}`,
          maxResults: limit,
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
        description: item.volumeInfo.description
          ? item.volumeInfo.description
          : "",
        language: item.volumeInfo.language ? item.volumeInfo.language : "",
        images: item.volumeInfo.imageLinks,
      };
    });
    return res.json(books);
  }

  public async getBookCompleteSearchByParamsGoogleApi(
    req: Request,
    res: Response
  ) {
    const id = req.params.id;
    const response = await axios.get(
      `https://www.googleapis.com/books/v1/volumes/${id}`
    );

    const books = response.data;
    return res.json(books);
  }
}

export { BookController };
