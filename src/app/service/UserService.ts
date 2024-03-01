import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { BadRequestError, NotFoundError } from "../helpers/api-errors";
import UserRepository from "../repositories/UserRepository";
import { LoginResponseType } from "../types/LoginResponseType";
import { ResponseType } from "../types/RsponseType";
import { userValidation } from "../validations/UserValidations";

class UserService {
  public async create(
    name: string,
    email: string,
    password: string
  ): Promise<ResponseType> {
    await userValidation.validate({ name, email, password });
    const userExist = await UserRepository.validationEmail(email);
    if (userExist) {
      return {
        error: true,
        message: "Erro: Email já cadastrado!",
        user: null,
      };
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await UserRepository.create(name, email, hashPassword);
    return {
      error: false,
      message: "Sucesso: Usuário cadastrado com sucesso!",
      user,
    };
  }

  public async findAll(): Promise<ResponseType> {
    const users = await UserRepository.findAll();

    return {
      error: false,
      message: "Sucesso: Usuários listados sucesso!",
      user: users,
    };
  }

  public async findById(id: number): Promise<ResponseType> {
    const user = await UserRepository.findById(id);

    if (!user) {
      return {
        error: true,
        message: "Error: User não encontrado!",
        user: null,
      };
    }

    return {
      error: false,
      message: "Sucesso: Usuário encontrado com sucesso!",
      user,
    };
  }

  public async update(
    id: number,
    name: string,
    email: string,
    password: string
  ): Promise<ResponseType> {
    const userExist = await UserRepository.findById(id);

    if (!userExist) {
      throw new NotFoundError("Usuário não encontrado");
    }

    const user = await UserRepository.update(id, name, email, password);

    return {
      error: false,
      message: "Sucesso: Usuário atualizado com sucesso!",
      user,
    };
  }

  public async delete(id: number): Promise<ResponseType> {
    const userExist = await UserRepository.findById(id);

    if (!userExist) {
      throw new NotFoundError("Usuário não encontrado");
    }

    const user = await UserRepository.delete(id);

    return {
      error: false,
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
