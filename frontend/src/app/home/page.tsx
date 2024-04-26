import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../api/auth/[...nextauth]/route";
import { BookResponse, findGoogleBook } from "../api/book/route";

const getData = async (): Promise<BookResponse> => {
  const data = await findGoogleBook();

  return data;
};

export default async function Home() {
  const session = await getServerSession(nextAuthOptions);
  const data = await getData();

  console.log(session);

  return (
    <>
      <h1 className="text-3xl">Olá {session?.name}, seja bem vindo!</h1>
    </>
  );
}
