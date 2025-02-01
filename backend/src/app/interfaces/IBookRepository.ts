import { Book } from "@prisma/client";

export interface IBookRepository {
  create(book: Book): Promise<Book>;
  findAll(): Promise<Book[] | null>;
  findById(id: string): Promise<Book | null>;
  update(id: string, book: Book): Promise<Book>;
  delete(id: string): Promise<Book>;
  findByTitle(title: string): Promise<Book | null>;
}
