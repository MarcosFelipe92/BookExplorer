import Footer from "@/components/footer";
import NavBar from "@/components/navbar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <main className="min-h-screen w-full flex flex-col items-center bg-slate-100">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
