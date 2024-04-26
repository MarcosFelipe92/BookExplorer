export type BookResponse = {
  id: string;
  title: string;
  author: string;
  description: string;
  language: string;
};

export const findGoogleBook = async (): Promise<BookResponse> => {
  const response = await fetch("http://localhost:8080/books/external/api", {
    method: "GET",
  });

  const data = await response.json();

  return data;
};
