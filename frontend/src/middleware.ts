export { default } from "next-auth/middleware";

export const config = { matcher: ["/books", "/favorites", "/about"] };
