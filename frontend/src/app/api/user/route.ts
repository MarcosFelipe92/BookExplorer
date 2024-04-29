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
  const response = await fetch("http://localhost:8080/users", {
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
};

export const findUserById = async (id: number): Promise<UserResponse> => {
  const response = await fetch(`http://localhost:8080/users/${id}`);

  const data = (await response.json()) as UserResponse;

  return data;
};
