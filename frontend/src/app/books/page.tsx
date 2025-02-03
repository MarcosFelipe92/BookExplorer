"use client";

import { nextAuthOptions } from "@/next-auth-options";
import { getServerSession, Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { BookResponse } from "../../actions/book/types";
import { SessionType } from "./types";
import {
  findGoogleBook,
  findGoogleBookByParams,
} from "@/actions/book/book-actions";
import { useEffect, useState } from "react";
import SearchForm from "@/components/search-form";
import { useSession } from "next-auth/react";

export async function getData(title = "", author = "") {
  const session = await getServerSession(nextAuthOptions);
  let books = [] as unknown as BookResponse[];

  books = await findGoogleBookByParams(title, author);

  return {
    props: {
      books,
      session,
    },
  };
}

export default function Book() {
  const { data: session } = useSession();
  const [allBooks, setAllBooks] = useState<BookResponse[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<BookResponse[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const books = await findGoogleBook();
      setAllBooks(books);
      setFilteredBooks(books);
    };
    fetchBooks();
  }, []);

  const handleSearch = async (title: string, author?: string) => {
    if (title === "") {
      setFilteredBooks(allBooks);
    } else {
      const filtered = await findGoogleBookByParams(title, author);
      setFilteredBooks(filtered);
    }
  };

  return (
    <>
      <h1 className="text-3xl pt-6">
        Olá {session?.user?.name}, seja bem vindo!
      </h1>
      <SearchForm onSearch={handleSearch} />
      <div className="flex flex-wrap justify-center w-full">
        {filteredBooks.map((book) => {
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
        })}
      </div>
    </>
  );
}
