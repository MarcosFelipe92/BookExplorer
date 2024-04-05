import { Book } from "@prisma/client";
import { NotFoundError } from "../helpers/api-errors";
import BookRepository from "../repositories/BookRepository";
import { BookResponseType } from "../types/BookRsponseType";
import { bookValidation } from "../validations/BookValidation";

class BookService {
  public async create(dataBook: Book): Promise<BookResponseType> {
    await bookValidation.validate(dataBook);
    const bookExist = await BookRepository.findByTitle(dataBook.title);
    if (bookExist) {
      return {
        error: true,
        message: "Erro: Livro já cadastrado!",
        book: null,
      };
    }

    const book = await BookRepository.create(dataBook);
    return {
      error: false,
      message: "Sucesso: Livro salvo com sucesso!",
      book,
    };
  }

  public async findAll(): Promise<BookResponseType> {
    const books = await BookRepository.findAll();

    return {
      error: false,
      message: "Sucesso: Livros listados sucesso!",
      book: books,
    };
  }

  public async findById(id: number): Promise<BookResponseType> {
    const book = await BookRepository.findById(id);

    if (!book) {
      throw new NotFoundError("Livro não encontrado");
    }

    return {
      error: false,
      message: "Sucesso: Livro encontrado com sucesso!",
      book,
    };
  }

  public async update(id: number, dataBook: Book): Promise<BookResponseType> {
    await bookValidation.validate(dataBook);
    const bookExist = await BookRepository.findById(id);

    if (!bookExist) {
      throw new NotFoundError("Livro não encontrado");
    }

    const book = await BookRepository.update(id, dataBook);

    return {
      error: false,
      message: "Sucesso: Usuário atualizado com sucesso!",
      book,
    };
  }

  public async delete(id: number): Promise<BookResponseType> {
    const bookExist = await BookRepository.findById(id);

    if (!bookExist) {
      throw new NotFoundError("Livro não encontrado");
    }

    const book = await BookRepository.delete(id);

    return {
      error: false,
      message: "Sucesso: Usuário deletado com sucesso!",
      book,
    };
  }
}

export default new BookService();
