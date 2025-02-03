"use client";

import {
  findGoogleBook,
  findGoogleBookByParams,
} from "@/actions/book/book-actions";
import SearchForm from "@/components/search-form";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BookResponse } from "../../actions/book/types";

export default function Book() {
  const { data: session } = useSession();
  const [allBooks, setAllBooks] = useState<BookResponse[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<BookResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      const books = await findGoogleBook();
      setAllBooks(books);
      setFilteredBooks(books);
      setLoading(false);
    };
    fetchBooks();
  }, []);

  const handleSearch = async (title: string, author?: string) => {
    setLoading(true);
    if (title === "") {
      setFilteredBooks(allBooks);
    } else {
      const filtered = await findGoogleBookByParams(title, author);
      setFilteredBooks(filtered);
    }
    setLoading(false);
  };

  return (
    <>
      <h1 className="text-3xl pt-6">
        Olá {session?.user?.name}, seja bem vindo!
      </h1>
      <SearchForm onSearch={handleSearch} />

      {loading ? (
        <div className="flex justify-center items-center w-full h-64">
          <div className="animate-spin rounded-full border-t-4 border-blue-500 w-16 h-16"></div>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center w-full">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => {
              let url = book.images?.thumbnail
                ? book.images?.thumbnail
                : book.images?.smallThumbnail;

              if (!url) {
                url = `/images/capa.jpeg`;
              }
              return (
                <div
                  key={book.id}
                  className=" p-2 rounded-md m-3 w-[250px] flex flex-col items-center bg-white"
                >
                  <Link href={`books/${book.id}`}>
                    <Image
                      src={`${url}`}
                      width={128}
                      height={197}
                      alt="Capa do livro"
                      className="border shadow-md"
                    />
                  </Link>
                  <div className="flex flex-col items-center mt-2">
                    <h2 className="text-md font-semibold">{book.title}</h2>
                    <p>{book.author}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <h2>Nenhum livro encontrado</h2>
          )}
        </div>
      )}
    </>
  );
}
