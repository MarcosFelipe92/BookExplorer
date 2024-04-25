export const createUser = async (
  name: string,
  email: string,
  password: string
) => {
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

  const result = await response.json();

  return result;
};
