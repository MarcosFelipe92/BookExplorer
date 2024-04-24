import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(nextAuthOptions);

  return (
    <>
      <h1 className="text-3xl">Olá {session?.result.name}, seja bem vindo!</h1>
    </>
  );
}
