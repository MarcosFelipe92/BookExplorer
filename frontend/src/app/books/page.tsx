import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { nextAuthOptions } from "../api/auth/[...nextauth]/route";
import { findGoogleBookByParams } from "../api/book/route";
import { BookResponse } from "../api/book/types";
import SearchForm from "./components/form";
import { SessionType } from "./types";

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

export default async function Book() {
  const {
    props: { books, session },
  } = await getData();
  const dataSession = session as unknown as SessionType;

  return (
    <>
      <h1 className="text-3xl pt-6">
        Olá {dataSession?.name}, seja bem vindo!
      </h1>
      <div className="flex flex-wrap justify-center w-full">
        {books.map((book) => {
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
