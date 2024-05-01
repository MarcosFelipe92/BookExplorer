# BookExplorer

Bem-vindo ao projeto BookExplorer! Esta aplicação web permite aos usuários explorar uma coleção de livros obtidos da API do Google Books.
Os usuários podem visualizar informações básicas sobre cada livro e clicar em um livro específico para obter detalhes mais aprofundados, como número de páginas, 
links para compra e descrições. Além disso, os usuários podem marcar seus livros favoritos e acessá-los posteriormente na página de favoritos.

## Recursos

- **Catálogo de Livros:** Navegue por uma variedade de livros obtidos da API do Google Books.
- **Detalhes do Livro:** Clique em livros individuais para visualizar informações detalhadas, incluindo contagem de páginas, links para compra e descrições.
- **Favoritos:** Os usuários podem marcar livros como favoritos e acessá-los convenientemente na página de favoritos.
- **Autenticação:** Os usuários devem fazer login para acessar o site, garantindo uma experiência personalizada.
- **Cadastro de Usuário:** Novos usuários podem se registrar para uma conta antes de fazer login.
- **Método de Autenticação:** Utiliza o NextAuth para autenticação.
- **Servidor Backend:** Desenvolvido com Express.js e Prisma ORM.
- **Geração de Tokens:** JWT é utilizado para gerar tokens no backend.
- **Validação de Requisições:** A biblioteca Yup garante a validação das requisições recebidas.
- **Framework Frontend:** Desenvolvido com Next.js e React.
- **Validação de Formulários:** React Hook Form e a biblioteca Zod são usados para validações de formulários.
- **Estilização:** Tailwind CSS combinado com Styled Components para uma interface elegante.
- **Busca de Dados:** A API Fetch é utilizada para requisições no frontend, enquanto o Axios é usado para buscar dados da API do Google.
- **Tratamento de Erros:** O tratamento de erros do backend é gerenciado através de middlewares.

## Tecnologias Utilizadas

- **Frontend:** Next.js, React, React Hook Form, Zod, Tailwind CSS, Styled Components
- **Backend:** Express.js, Prisma ORM, JWT, Yup
- **Integração de API:** Fetch API, Axios
- **Autenticação:** NextAuth
