import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { nextAuthOptions } from "../api/auth/[...nextauth]/route";
import { findUserById } from "../api/user/route";
import { SessionType } from "../books/types";
import { DeleteButton } from "@/components/deleteButton";

export default async function Favorites() {
  const session = await getServerSession(nextAuthOptions);
  const dataSession = session as unknown as SessionType;
  const user = await findUserById(dataSession.id);
  const favorites = user.user?.favorites ? user.user?.favorites : [];

  return (
    <>
      <div className="w-[80%]">
        <h1 className="text-3xl font-bold mt-4">Favoritos</h1>
        <div className="flex gap-9 flex-wrap">
          {favorites.length ? (
            favorites.map((book) => {
              let url = book?.thumbnail
                ? book?.thumbnail
                : book?.smallThumbnail;

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
                  <DeleteButton
                    className="bg-slate-200 text-black flex items-center rounded-md p-1"
                    id={book.id}
                  />
                </div>
              );
            })
          ) : (
            <p>Não existe nenhum livro favorito</p>
          )}
        </div>
      </div>
    </>
  );
}
