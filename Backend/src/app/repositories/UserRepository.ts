import { User } from "@prisma/client";
import prisma from "../database";
import { IUserRepository } from "../interfaces/IUserRepository";

class UserRepository implements IUserRepository {
  public async create(dataUser: User): Promise<User> {
    const user = await prisma.user.create({
      data: dataUser,
    });
    return user;
  }

  public async findAll(): Promise<User[] | null> {
    const users = await prisma.user.findMany({});
    return users;
  }

  public async findById(id: number): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });
    return user;
  }

  public async update(id: number, dataUser: User): Promise<User> {
    const user = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: dataUser,
    });
    return user;
  }

  public async delete(id: number): Promise<User> {
    const user = await prisma.user.delete({
      where: {
        id: Number(id),
      },
    });
    return user;
  }

  public async validationEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    return user;
  }
}

export default new UserRepository();
