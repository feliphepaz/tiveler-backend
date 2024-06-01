# Descrição

Sistema desenvolvido em Node.js e Express para atuar como o núcleo do Projeto Tardis.

# Instalação

#### 1. Clone o repositório em sua máquina local:

```
git clone git@github.com:ResultadosDigitais/tardis-backend.git
```

#### 2. Acesse o diretório do projeto e execute o seguinte comando para instalar as dependências:

```
cd tardis-backend
yarn install
```

#### 4. Inicie o servidor de desenvolvimento:

Este projeto utiliza o `nodemon` para executar o ambiente de desenvolvimento e monitorar em tempo real as alterações nos arquivos. Para iniciar o ambiente de desenvolvimento, utilize o seguinte comando:

```
yarn dev
```

#### 5. Documentação

A documentação da API foi escrita utilizando a biblioteca swagger-ui-express, para acessar, ao rodar o projeto, acesse o seguinte endpoint:

`http:localhost:5000/docs`

#### 6. Mode Debug

Para depurar a aplicação através do debugger do vscode, siga estas instruções:

1.  Abra o Visual Studio Code.

2.  Acesse a seção de depuração na barra lateral do vscode ou utilize **Ctrl + Shift + D**.

3.  Selecione a opção **Debug: Node with Nodemon**.

4.  Clique no botão de play para iniciar o debugger.

#### 6. Deploy e Build

Para executar a aplicação em ambiente de produção, siga os seguintes passos para otimizar a performance e transpilar o código TypeScript para JavaScript:

**Gerar o build:**

```
yarn build
```

**Executar o projeto a partir do build:**

```
yarn start
```

# Lint e Formatação

Este projeto utiliza `ESLint, Prettier, Husky e EditorConfig` para garantir consistência no estilo e qualidade do código, realizar linting e formatação automática, além de facilitar a colaboração em equipe.<br>

**Para rodar o lint geral que verifica sintaxe e formatação do código, utilize o seguinte comando**:

<br>

```
yarn lint
```

<br>

**Para corrigir os erros de formatação do código, utilize o seguinte comando**:

<br>

```
yarn lint:fix
```

<br>

## **Eslint**:

ESLint é uma ferramenta de linting que ajuda a identificar e corrigir problemas no código TypeScript. Ele é configurado neste projeto para aplicar regras de estilo e boas práticas de codificação.

Para executar o linting em todo o projeto, utilize o seguinte comando no terminal na pasta do projeto:

<br>

```
yarn lint:syntax
```

<br>

## **Prettier**:

É uma ferramenta de formatação de código que permite manter um estilo de código consistente em todo o projeto. Ele é configurado para trabalhar em conjunto com o ESLint neste projeto.

Para verificar os arquivos do projeto, utilize o seguinte comando:

<br>

```
yarn lint:format
```

<br>

## **EditorConfig**:

É uma ferramenta que ajuda a manter a consistência do estilo de código entre diferentes editores e IDEs. O projeto possui um arquivo `.editorconfig` que define algumas configurações de estilo, como indentação, espaçamento, entre outros.<br><br>

**Obs: utilizar o `.eslintignore` e o `@ts-nochek` somente em arquivos de terceiros.**
