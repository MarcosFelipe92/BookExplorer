import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
  return (
    <>
      <nav className="flex justify-between items-center w-full mb-6 bg-[#1fe6dd] p-4 text-white ">
        <Link href="/home">
          <Image
            src="/images/logo.jpeg"
            height={50}
            width={50}
            alt="Logo"
            className="rounded-md"
          />
        </Link>
        <ul className="flex gap-9">
          <li>
            <Link
              href="/home"
              className="hover:boorder hover:border-b-2 hover:border-white text-xl"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="hover:boorder hover:border-b-2 hover:border-white text-xl"
            >
              Sobre
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
