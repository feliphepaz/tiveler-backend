# Tiveler (Back-end)

Sistema backend desenvolvido em Node.js, TypeScript e Express para dar suporte à aplicação Tiveler. O projeto expõe uma API REST para gestão de conteúdos acadêmicos e informações relacionadas ao sistema, com estrutura organizada em controllers, models, routes e documentação Swagger.

## Visão geral

Este backend foi pensado para servir como núcleo da aplicação Tiveler, oferecendo:

- CRUD de estudantes
- CRUD de conteúdos, lições e temas
- Validações de dados
- Conexão com MongoDB via Mongoose
- Documentação da API com Swagger
- Estrutura pronta para desenvolvimento e produção
- Suporte a lint, formatação e padronização do código

## Stack tecnológica

- Node.js
- TypeScript
- Express
- MongoDB + Mongoose
- Swagger UI Express
- CORS
- dotenv
- ESLint
- Prettier
- Husky
- Nodemon

## Requisitos

Antes de iniciar, certifique-se de ter instalado em sua máquina:

- Node.js (versão recomendada LTS)
- Yarn
- MongoDB em execução ou uma conexão configurada

## Instalação

1. Clone o repositório:

```bash
git clone git@github.com:feliphepaz/tiveler-backend.git
```

2. Acesse a pasta do projeto:

```bash
cd tiveler-backend
```

3. Instale as dependências:

```bash
yarn install
```

## Configuração de ambiente

Crie um arquivo `.env.local` na raiz do projeto com as variáveis necessárias, por exemplo:

```env
PORT=5000
DATABASE=mongodb://localhost:27017/tiveler
```

> O projeto já usa `dotenv` para carregar esse arquivo durante a execução.

## Executando em desenvolvimento

Para iniciar o servidor em modo de desenvolvimento com reinicialização automática:

```bash
yarn dev
```

O servidor será iniciado em:

```bash
http://localhost:5000
```

## Documentação da API

A documentação da API foi gerada com Swagger e pode ser acessada em:

```bash
http://localhost:5000/docs
```

## Build para produção

Para compilar o projeto TypeScript para JavaScript:

```bash
yarn build
```

Para iniciar a aplicação já compilada:

```bash
yarn start
```

## Scripts disponíveis

No arquivo `package.json`, o projeto já contém os seguintes comandos:

```bash
yarn dev
yarn build
yarn start
yarn lint
yarn lint:fix
yarn lint:syntax
yarn lint:format
```

## Estrutura do projeto

```bash
tiveler-backend/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.ts
│   └── ...
├── .editorconfig
├── .env.example
├── .gitignore
├── .husky/
├── .lintstagedrc
├── .prettierrc
├── eslint.config.js
├── nodemon.json
├── package.json
├── tsconfig.json
├── README.md
├── yarn.lock
└── ...
```

## Lint e formatação

O projeto utiliza ESLint, Prettier, Husky e EditorConfig para manter a padronização do código e evitar problemas de estilo.

Para verificar a sintaxe e formatação:

```bash
yarn lint
```

Para corrigir automaticamente a formatação:

```bash
yarn lint:fix
```

## Observações

- O projeto usa `tsc-alias` no build para resolver aliases de caminhos.
- O servidor inicia com `nodemon` para facilitar o desenvolvimento.
- O MongoDB deve estar disponível antes do start da aplicação.

## Licença

Este projeto está licenciado sob a licença MIT.
