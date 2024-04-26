type User = {
  name: string;
  email: string;
  password: string;
  books?: string;
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

  const result = (await response.json()) as UserResponse;

  return result;
};
