import { Author, Book, BookResponse, BookVolume } from "./types";

export const createBook = async (
  id: string,
  title: string,
  authors: Author[],
  publishedDate: string,
  description: string,
  language: string,
  smallThumbnail: string,
  thumbnail: string,
  userId: number
): Promise<BookResponse> => {
  const response = await fetch("http://localhost:8080/books", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      id,
      title,
      authors,
      publishedDate,
      description,
      language,
      smallThumbnail,
      thumbnail,
      userId,
    }),
  });

  const data = await response.json();
  console.log(data);

  return data;
};

export const findBookById = async (id: string): Promise<Book> => {
  const response = await fetch(`http://localhost:8080/books/${id}`, {
    method: "GET",
  });

  const data = await response.json();

  return data;
};

export const deleteBook = async (id: string) => {
  const response = await fetch(`http://localhost:8080/books/${id}`, {
    method: "DELETE",
  });

  const data = await response.json();

  return data;
};

export const findGoogleBook = async (): Promise<BookResponse[]> => {
  const response = await fetch("http://localhost:8080/books/external/api", {
    method: "GET",
  });

  const data = await response.json();

  return data;
};

export const findGoogleBookByParams = async (
  title: string,
  author: string
): Promise<BookResponse[]> => {
  const queryParams = new URLSearchParams({
    title: title,
    author: author,
    limit: "40",
  });

  const url = `http://localhost:8080/books/external/api/params?${queryParams}`;

  const response = await fetch(url, {
    method: "GET",
  });

  const data = await response.json();
  return data;
};
export const findGoogleBookDetails = async (
  id: string
): Promise<BookVolume> => {
  const url = `http://localhost:8080/books/external/api/params/${id}`;

  const response = await fetch(url, {
    method: "GET",
  });

  const data = await response.json();
  return data;
};
