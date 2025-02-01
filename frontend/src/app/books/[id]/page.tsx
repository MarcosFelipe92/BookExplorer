import Image from "next/image";
import { findGoogleBookDetails } from "../../api/book/route";
import { BackButton } from "@/app/books/components/backButton";
import { FavoritesButton } from "@/app/books/components/favoriteButton";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { SessionType } from "../types";

export default async function BookDetails({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const data = await findGoogleBookDetails(id);
  const session = await getServerSession(nextAuthOptions);
  const dataSession = session as unknown as SessionType;

  let url = data.volumeInfo.imageLinks?.extraLarge
    ? data.volumeInfo.imageLinks?.extraLarge
    : data.volumeInfo.imageLinks?.large;

  if (!url) {
    url = `/images/capa.jpeg`;
  }
  const dataBook = {
    id: data.id,
    volumeInfo: data.volumeInfo,
    userId: dataSession.id,
  };

  return (
    <>
      <div className="p-2 w-full flex flex-col bg-[#022245]">
        <div className="flex justify-between">
          <BackButton className="flex items-center text-2xl text-white hover:text-yellow-500 mb-4" />
          <FavoritesButton
            className="flex items-center text-3xl gap-2 text-white hover:text-yellow-500 mr-4"
            book={dataBook}
          />
        </div>
        <div className="flex max-h-[30%] w-[80%] mx-auto justify-between">
          <Image
            src={`${url}`}
            width={300}
            height={300}
            alt="Capa do livro"
            className="border shadow-md"
          />
          <div className="flex flex-col ml-10 mt-10 text-white">
            <h2 className="text-3xl font-bold">{data.volumeInfo?.title}</h2>
            <div>
              <div className="flex gap-3 mt-2">
                {data.volumeInfo.authors?.map((author) => {
                  return <p key={author}>{author};</p>;
                })}
              </div>
              <div className="flex justify-between mt-10">
                <div>
                  <p>
                    <span className="font-bold">Páginas: </span>
                    {data.volumeInfo?.pageCount}
                  </p>
                  <p>
                    <span className="font-bold">Editora: </span>
                    {data.volumeInfo?.publisher}
                  </p>
                  <p>
                    <span className="font-bold">Idioma: </span>
                    {data.volumeInfo?.language}
                  </p>
                </div>
                <div>
                  <p>
                    <span className="font-bold">Data de publicação: </span>
                    {data.volumeInfo?.publishedDate}
                  </p>
                  <p>
                    <span className="font-bold">ISBN: </span>
                    {data.volumeInfo.industryIdentifiers?.map((item) => {
                      if (item.type === "ISBN_13") {
                        return item.identifier;
                      } else {
                        return "";
                      }
                    })}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-10">
                <span className="font-bold">Categorias: </span>
                {data.volumeInfo.categories?.map((categorie) => {
                  return <p key={categorie}>{categorie};</p>;
                })}
              </div>
              <div className="mt-10">
                <p>
                  <span className="font-bold">Link para compra: </span>
                  <a
                    href={`${data.saleInfo.buyLink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {data.saleInfo.buyLink
                      ? data.saleInfo.buyLink
                      : "Link indisponível"}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[80%] ">
        <h1 className="text-3xl my-4 text-[#1fe6dd] font-bold">Descrição</h1>
        <p className="text-xl">{data.volumeInfo?.description}</p>
      </div>
    </>
  );
}
