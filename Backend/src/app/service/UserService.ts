import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { BadRequestError, NotFoundError } from "../helpers/api-errors";
import UserRepository from "../repositories/UserRepository";
import { LoginResponseType } from "../types/LoginResponseType";
import { UserResponseType } from "../types/UserRsponseType";

class UserService {
  public async create(dataUser: User): Promise<UserResponseType> {
    const userExist = await UserRepository.validationEmail(dataUser.email);
    if (userExist) {
      throw new BadRequestError("Usuário já existe!");
    }

    dataUser.password = await bcrypt.hash(dataUser.password, 10);

    const user = await UserRepository.create(dataUser);
    return {
      message: "Sucesso: Usuário cadastrado com sucesso!",
      user,
    };
  }

  public async findAll(): Promise<UserResponseType> {
    const users = await UserRepository.findAll();

    return {
      message: "Sucesso: Usuários listados sucesso!",
      user: users,
    };
  }

  public async findById(id: number): Promise<UserResponseType> {
    const user = await UserRepository.findById(id);

    if (!user) {
      throw new NotFoundError("Usuário não encontrado");
    }

    return {
      message: "Sucesso: Usuário encontrado com sucesso!",
      user,
    };
  }

  public async update(id: number, dataUser: User): Promise<UserResponseType> {
    const userExist = await UserRepository.findById(id);

    if (!userExist) {
      throw new NotFoundError("Usuário não encontrado");
    }

    const user = await UserRepository.update(id, dataUser);

    return {
      message: "Sucesso: Usuário atualizado com sucesso!",
      user,
    };
  }

  public async delete(id: number): Promise<UserResponseType> {
    const userExist = await UserRepository.findById(id);

    if (!userExist) {
      throw new NotFoundError("Usuário não encontrado");
    }

    const user = await UserRepository.delete(id);

    return {
      message: "Sucesso: Usuário deletado com sucesso!",
      user,
    };
  }

  public async login(
    email: string,
    password: string
  ): Promise<LoginResponseType> {
    const user = await UserRepository.validationEmail(email);

    if (!user) {
      throw new BadRequestError("Error: Email ou senha inválidos!");
    }

    const verifyPass = await bcrypt.compare(password, user.password);

    if (!verifyPass) {
      throw new BadRequestError("Error: Email ou senha inválidos!");
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET ?? "", {
      expiresIn: "8h",
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    };
  }
}

export default new UserService();
