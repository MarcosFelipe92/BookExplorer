import Form from "@/components/form";
import { Alumni_Sans, Sedan } from "next/font/google";
import Link from "next/link";

const font = Alumni_Sans({
  weight: "800",
  subsets: ["latin"],
  style: "italic",
});

export default function Login() {
  return (
    <main className="flex justify-between w-full ">
      <div className="bg-[url('/images/login.jpeg')] h-screen w-[900px] ">
        <h1 className="text-6xl italic text-white font-light ml-5">
          <span
            className={`font-extrabold text-7xl text-white ${font.className}`}
          >
            BOOK
          </span>
          EXPLORER
        </h1>
      </div>
      <div className="mx-auto mt-[10%] flex flex-col items-center gap-2 ">
        <Form />
        <Link
          href="/register"
          className="p-[6px] text-xl rounded-md mt-2 text-center"
        >
          Não possui conta?
        </Link>
      </div>
    </main>
  );
}
