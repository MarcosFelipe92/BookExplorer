import { User } from "@prisma/client";

export interface IUserRepository {
  create(user: User): Promise<User>;
  findAll(): Promise<User[] | null>;
  findById(id: number): Promise<User | null>;
  update(id: number, user: User): Promise<User>;
  delete(id: number): Promise<User>;
  validationEmail(email: string): Promise<User | null>;
}
