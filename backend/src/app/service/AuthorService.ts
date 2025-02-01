import { Author } from "@prisma/client";
import { NotFoundError } from "../helpers/api-errors";
import AuthorRepository from "../repositories/AuthorRepository";
import { AuthorResponseType } from "../types/AuthorRsponseType";

class AuthorService {
  public async create(dataAuthor: Author): Promise<AuthorResponseType> {
    const author = await AuthorRepository.create(dataAuthor);
    return {
      message: "Sucesso: Autor adicionado com sucesso!",
      author,
    };
  }

  public async findAll(): Promise<AuthorResponseType> {
    const authors = await AuthorRepository.findAll();

    return {
      message: "Sucesso: Autores listados sucesso!",
      author: authors,
    };
  }

  public async findById(id: number): Promise<AuthorResponseType> {
    const author = await AuthorRepository.findById(id);

    if (!author) {
      throw new NotFoundError("Autor não encontrado!");
    }

    return {
      message: "Sucesso: Autor encontrado com sucesso!",
      author,
    };
  }

  public async update(
    id: number,
    dataAuthor: Author
  ): Promise<AuthorResponseType> {
    const authorExist = await AuthorRepository.findById(id);

    if (!authorExist) {
      throw new NotFoundError("Autor não encontrado!");
    }

    const author = await AuthorRepository.update(id, dataAuthor);

    return {
      message: "Sucesso: Autor atualizado com sucesso!",
      author,
    };
  }

  public async delete(id: number): Promise<AuthorResponseType> {
    const authorExist = await AuthorRepository.findById(id);

    if (!authorExist) {
      throw new NotFoundError("Autor não encontrado!");
    }

    const author = await AuthorRepository.delete(id);

    return {
      message: "Sucesso: Livro deletado com sucesso!",
      author,
    };
  }
}

export default new AuthorService();
