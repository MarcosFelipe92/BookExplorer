import { Book } from "@prisma/client";
import prisma from "../database";
import { IBookRepository } from "../interfaces/IBookRepository";

class BookRepository implements IBookRepository {
  public async create(dataBook: Book): Promise<Book> {
    const book = await prisma.book.create({
      data: dataBook,
    });
    return book;
  }

  public async findAll(): Promise<Book[] | null> {
    const books = await prisma.book.findMany({});
    return books;
  }

  public async findById(id: string): Promise<Book | null> {
    const book = await prisma.book.findUnique({
      where: { id: id },
      include: {
        authors: true,
      },
    });
    return book;
  }

  public async update(id: string, dataBook: Book): Promise<Book> {
    const book = await prisma.book.update({
      where: {
        id: id,
      },
      data: dataBook,
    });
    return book;
  }

  public async delete(id: string): Promise<Book> {
    const book = await prisma.book.delete({
      where: {
        id: id,
      },
    });
    return book;
  }

  public async findByTitle(title: string): Promise<Book | null> {
    const book = await prisma.book.findFirst({
      where: {
        title: title,
      },
    });

    return book;
  }
}

export default new BookRepository();
