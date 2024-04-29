import NextAuthSessionProvider from "@/providers/sessionProvider";
import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";

const inter = Roboto({
  weight: ["400", "700", "900", "300"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Book Explore, sua biblioteca virtual",
  description:
    "Um site onde é possível visualizar livros de diversos autores e nacionalidades diferentes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`flex min-h-screen flex-col items-center max-w-full m-auto ${inter.className}`}
      >
        <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
      </body>
    </html>
  );
}
