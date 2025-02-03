import { BACKEND_URL } from "@/constants";
import { Book } from "../book/types";

type User = {
  name: string;
  email: string;
  password: string;
  favorites: Book[] | [];
};

type UserResponse = {
  message: string;
  user?: User;
};

export const createUser = async (
  name: string,
  email: string,
  password: string
): Promise<UserResponse> => {
  try {
    const response = await fetch(`${BACKEND_URL}/users`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = (await response.json()) as UserResponse;

    return data;
  } catch (error) {
    return {
      message: "Ocorreu um erro inesperado, tente novamente mais tarde.",
    };
  }
};

export const findUserById = async (id: number): Promise<UserResponse> => {
  const response = await fetch(`${BACKEND_URL}/users/${id}`);

  const data = (await response.json()) as UserResponse;

  return data;
};
