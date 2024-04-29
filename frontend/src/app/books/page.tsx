import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { nextAuthOptions } from "../api/auth/[...nextauth]/route";
import { findGoogleBook } from "../api/book/route";
import { SessionType } from "./types";

export default async function Book() {
  const session = await getServerSession(nextAuthOptions);
  const dataSession = session as unknown as SessionType;
  const data = await findGoogleBook();

  return (
    <>
      <h1 className="text-3xl pt-6">
        Olá {dataSession?.name}, seja bem vindo!
      </h1>
      <div className="flex flex-wrap justify-center w-full">
        {data.map((book) => {
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
