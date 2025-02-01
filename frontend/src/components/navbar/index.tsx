"use client";

import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function NavBar() {
  return (
    <>
      <nav className="flex justify-between items-center w-full bg-[#1fe6dd] p-4 text-white ">
        <Link href="/books">
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
              href="/books"
              className="hover:boorder hover:border-b-2 hover:border-white text-xl"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/favorites"
              className="hover:boorder hover:border-b-2 hover:border-white text-xl"
            >
              Favoritos
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
          <li>
            <button
              className="px-2 rounded-md hover:bg-red-700 bg-red-500 text-xl"
              onClick={() => signOut()}
            >
              Sair
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
