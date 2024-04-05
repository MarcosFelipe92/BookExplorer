import { Book } from "@prisma/client";

export interface IBookRepository {
  create(book: Book): Promise<Book>;
  findAll(): Promise<Book[] | null>;
  findById(id: number): Promise<Book | null>;
  update(id: number, book: Book): Promise<Book>;
  delete(id: number): Promise<Book>;
  findByTitle(title: string): Promise<Book | null>;
}
