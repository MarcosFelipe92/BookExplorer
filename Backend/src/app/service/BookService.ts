import { Book } from "@prisma/client";
import { BadRequestError, NotFoundError } from "../helpers/api-errors";
import BookRepository from "../repositories/BookRepository";
import { BookResponseType } from "../types/BookRsponseType";
import { bookValidation } from "../validations/BookValidation";

class BookService {
  public async create(dataBook: Book): Promise<BookResponseType> {
    const bookExist = await BookRepository.findByTitle(dataBook.title);
    if (bookExist) {
      throw new BadRequestError("Livro já adicionado!");
    }

    const book = await BookRepository.create(dataBook);
    return {
      message: "Sucesso: Livro adicionado com sucesso!",
      book,
    };
  }

  public async findAll(): Promise<BookResponseType> {
    const books = await BookRepository.findAll();

    return {
      message: "Sucesso: Livros listados sucesso!",
      book: books,
    };
  }

  public async findById(id: number): Promise<BookResponseType> {
    const book = await BookRepository.findById(id);

    if (!book) {
      throw new NotFoundError("Livro não encontrado!");
    }

    return {
      message: "Sucesso: Livro encontrado com sucesso!",
      book,
    };
  }

  public async update(id: number, dataBook: Book): Promise<BookResponseType> {
    await bookValidation.validate(dataBook);
    const bookExist = await BookRepository.findById(id);

    if (!bookExist) {
      throw new NotFoundError("Livro não encontrado!");
    }

    const book = await BookRepository.update(id, dataBook);

    return {
      message: "Sucesso: Livro atualizado com sucesso!",
      book,
    };
  }

  public async delete(id: number): Promise<BookResponseType> {
    const bookExist = await BookRepository.findById(id);

    if (!bookExist) {
      throw new NotFoundError("Livro não encontrado!");
    }

    const book = await BookRepository.delete(id);

    return {
      message: "Sucesso: Livro deletado com sucesso!",
      book,
    };
  }
}

export default new BookService();
