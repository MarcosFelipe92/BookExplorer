import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../api/auth/[...nextauth]/route";
import { findUserById } from "../api/user/route";
import { SessionType } from "../books/types";
import Link from "next/link";
import Image from "next/image";

export default async function Favorites() {
  const session = await getServerSession(nextAuthOptions);
  const dataSession = session as unknown as SessionType;
  const data = await findUserById(dataSession.id);

  return (
    <>
      <div className="w-[80%]">
        <h1 className="text-3xl font-bold mt-4">Favoritos</h1>
        <div>
          {data.user?.favorites.length ? (
            data.user?.favorites.map((book) => {
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
            <p>Não existe nenhum livro favorito</p>
          )}
        </div>
      </div>
    </>
  );
}
