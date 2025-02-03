import Image from "next/image";

export default function About() {
  return (
    <>
      <div className="w-[1024px] mx-auto">
        <h1 className="text-4xl text-[#0EEDCF] font-bold mb-6">
          Sobre o BookExplorer
        </h1>
        <p className="text-lg">
          Bem-vindo ao BookExplorer, sua biblioteca virtual confiável. Somos uma
          plataforma dedicada a conectar ávidos leitores com uma variedade de
          livros de autores e nacionalidades distintas. Nós fornecemos a você
          informações abrangentes e atualizadas sobre uma infinidade de livros.
          Com apenas alguns cliques, você pode descobrir detalhes sobre o livro
          de sua escolha, incluindo uma descrição completa, links para compra e
          muito mais. No BookExplorer, nosso objetivo é facilitar a exploração
          de novos livros e autores. No entanto, observe que, embora forneçamos
          informações detalhadas e links para compra, a leitura direta dos
          livros na nossa plataforma não é possível.
        </p>
        <div className="flex justify-center my-4">
          <Image
            src="/images/sobre.jpeg"
            width={1024}
            height={1024}
            alt="Iamgemde pessoas em uma biblioteca"
          />
        </div>
      </div>
    </>
  );
}
