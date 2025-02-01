import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    result: {
      id: string;
      email: string;
      name: string;
    };
  }
}
