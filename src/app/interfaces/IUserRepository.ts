import { User } from "@prisma/client";

export interface IUserRepository {
  create(name: string, email: string, password: string): Promise<User>;
  findAll(): Promise<User[] | null>;
  findById(id: number): Promise<User | null>;
  update(
    id: number,
    name: string,
    email: string,
    password: string
  ): Promise<User>;
  delete(id: number): Promise<User>;
  validationEmail(email: string): Promise<User | null>;
}
