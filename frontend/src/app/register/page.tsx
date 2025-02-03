import { Alumni_Sans } from "next/font/google";
import RegisterForm from "../../components/form-register";

const font = Alumni_Sans({
  weight: "800",
  subsets: ["latin"],
  style: "italic",
});

export default function Register() {
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
      <div className="mx-auto mt-[10%]">
        <RegisterForm />
      </div>
    </main>
  );
}
