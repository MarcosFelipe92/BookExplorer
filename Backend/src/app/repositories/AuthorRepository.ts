import { Author } from "@prisma/client";
import prisma from "../database";
import { IAuthorRepository } from "../interfaces/IAuthorRepository";

class AuthorRepository implements IAuthorRepository {
  public async create(dataAuthor: Author): Promise<Author> {
    const book = await prisma.author.create({
      data: dataAuthor,
    });
    return book;
  }

  public async findAll(): Promise<Author[] | null> {
    const authors = await prisma.author.findMany({});
    return authors;
  }

  public async findById(id: number): Promise<Author | null> {
    const author = await prisma.author.findUnique({
      where: { id: Number(id) },
    });
    return author;
  }

  public async update(id: number, dataAuthor: Author): Promise<Author> {
    const author = await prisma.author.update({
      where: {
        id: Number(id),
      },
      data: dataAuthor,
    });
    return author;
  }

  public async delete(id: number): Promise<Author> {
    const author = await prisma.author.delete({
      where: {
        id: Number(id),
      },
    });
    return author;
  }

  public async findByBookId(bookId: string): Promise<Author | null> {
    const author = await prisma.author.findFirst({
      where: {
        bookId: bookId,
      },
    });

    return author;
  }
}

export default new AuthorRepository();
