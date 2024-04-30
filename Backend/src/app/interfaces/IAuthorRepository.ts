import { Author } from "@prisma/client";

export interface IAuthorRepository {
  create(author: Author): Promise<Author>;
  findAll(): Promise<Author[] | null>;
  findById(id: number): Promise<Author | null>;
  update(id: number, author: Author): Promise<Author>;
  delete(id: number): Promise<Author>;
  findByBookId(bookId: string): Promise<Author | null>;
}
