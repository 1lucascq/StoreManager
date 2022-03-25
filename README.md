# Sumário

- [Sobre o Projeto](#sobre-o-projeto)
  - [O que deverá ser desenvolvido](#o-que-deverá-ser-desenvolvido)
  - [Notas](#notas)
- [Objetivos](#Objetivos)
  - [Lista de objetivos](#lista-de-objetivos)
    - [1 - Endpoint POST `/user`](#1---endpoint-POST-user)
    - [2 - Endpoint POST `/login`](#2---endpoint-POST-login)
    - [3 - Endpoint GET `/user`](#3---endpoint-GET-user)
    - [4 - Endpoint GET `/user/:id`](#4---endpoint-GET-userid)
    - [5 - Endpoint POST `/categories`](#5---endpoint-POST-categories)
    - [6 - Endpoint GET `/categories`](#6---endpoint-GET-categories)
    - [7 - Endpoint POST `/post`](#7---endpoint-POST-post)
    - [8 - Endpoint GET `/post`](#8---endpoint-GET-post)
    - [9 - Endpoint GET `post/:id`](#9---endpoint-GET-postid)
    - [10 - Endpoint PUT `/post/:id`](#10---endpoint-PUT-postid)
    - [11 - Endpoint DELETE `post/:id`](#11---endpoint-DELETE-postid)
    - [12 - Endpoint DELETE `/user/me`](#12---endpoint-DELETE-userme)
    - [13 - Endpoint GET `post/search?q=:searchTerm`](#13---endpoint-GET-postsearchqsearchterm)
- [Implementações Futuras](#implementações-futuras )


# Sobre o Projeto 

Nesse projeto, você vai construir um back-end usando `ORM` com o pacote `sequelize` do `npm`, e será capaz de:
 - Criar e associar tabelas usando `models` do `sequelize`
 - Construir endpoints para consumir os models que criar 
 - Fazer um `CRUD` com o `ORM`

## O que deverá ser desenvolvido

Arquiteturar e desenvolver uma API de um CRUD posts de blog (com o Sequelize). Começando pela API, serão desenvolvidos alguns endpoints (seguindo os princípios do REST) que estarão conectados ao seu banco de dados.

Primeiro, você irá criar uma tabela para os usuários que desejam se cadastrar na aplicação. Após isso, criará também uma tabela de Categorias para seus Posts e por fim a tabela de Posts será seu foco, guardando todas as informações dos posts realizados na plataforma. Essa é apenas uma recomendação!

---
## Notas
- O projeto requer o uso das seguintes variáveis de ambiente para o devido funcionamento:
`host: process.env.HOSTNAME`
`user: process.env.MYSQL_USER`
`password: process.env.MYSQL_PASSWORD`
`jwt_secret: process.env.JWT_SECRET`

- O projeto se encontra online e apto para testes no link contido na sessão **About**.

---
# Objetivos

Desenvolver uma aplicação em `Node.js` usando o pacote `sequelize` para fazer um `CRUD` de posts.

Para fazer um post é necessário usuário e login, portanto será trabalhada a **relação entre** `user` e `post`. Também será necessário a utilização de categorias para seus posts, assim trabalhando a relação de `posts` para `categorias` e de `categorias` para `posts`.

## Tópicos 

### 1 - Endpoint POST `/user`
- Possibilita a adição de um novo **usuário** ao banco de dados;
- Estrutura da requisição:
  ```json
  {
    "displayName": "Jack Johnson", // length > 7
    "email": "jj@email.com", // único e será validado
    "password": "123456", // length === 6
    "image": "http://link-da-imagem.png"
  }
  ```
- A criação de **usuário** com sucesso deve responder com um token (sucesso) ou um erro personalizado (falha).

### 2 - Endpoint POST `/login`
- Realiza o login caso os dados sejam passados corretamente;
- Estrutura da requisição:
  ```json
  {
    "email": "jj@email.com",
    "password": "123456",
  }
  ```
- O login com sucesso deve responder com um token (sucesso) ou um erro personalizado (falha).

### 3 - Endpoint GET `/user`
- Lista os dados de todos os **usuários** cadastrados;
- A requisição deve ser feita com um token recebido ao efetuar o login ou criar um novo usuário;
- Estrutura do retorno:
  ```json
  [
    {
      "id": "1",
      "displayName": "Jack Johnson",
      "email": "jj@email.com",
      "image": "http://link-da-imagem.png"
    },
    {
      "id": "1",
      "displayName": "Bruce Dickinson ",
      "email": "bd@ironmail.com",
      "image": "http://link-da-imagem.png"
    },
  ]
  ```
- A consulta com sucesso deve responder com os dados dos **usuários** (sucesso) ou um erro personalizado (falha).

### 4 - Endpoint GET `/user/:id`
- Lista os dados do **usuário** cujo respectivo :id é repassado através da URL;
- A requisição deve ser feita com um token recebido ao efetuar o login ou criar um novo usuário;
- Estrutura do retorno:
  ```json
  [
    {
      "id": "1",
      "displayName": "Jack Johnson",
      "email": "jj@email.com",
      "image": "http://link-da-imagem.png"
    }
  ]
  ```
- A consulta com sucesso deve responder com os dados do **usuário** (sucesso) ou um erro personalizado (falha).

### 5 - Endpoint POST `/categories`
- Permite criar uma nova categoria de **posts**;
- A requisição deve ser feita com um token recebido ao efetuar o login ou criar um novo usuário;
- Estrutura da requisição:
  ```json
  [
    {
      "name": "Inovação"
    }
  ]
  ```
- O endpoint deve retornar o id e nome da categoria criada (sucesso) ou um erro personalizado (falha).

### 6 - Endpoint GET `/categories`
- Consulta todas as categorias disponíveis;
- A requisição deve ser feita com um token recebido ao efetuar o login ou criar um novo usuário;
- Estrutura do retorno:
  ```json
  [
    {
      "id": 1,
      "name": "Escola"
    },
    {
      "id": 2,
      "name": "Inovação"
    }
  ]
  ```
- O endpoint deve retornar um array com os dados das categorias criadas (sucesso) ou um erro personalizado (falha).

### 7 - Endpoint POST `/post`
- Cria um novo post;
- A requisição deve ser feita com um token recebido ao efetuar o login ou criar um novo usuário;
- Estrutura da requisição:
  ```json
  {
    "title": "PERDEU TUDO!!1!",
    "content": "Conheça o drama de João José",
    "categoryIds": [1, 2]
  }
  ```
- O endpoint deve retornar um objeto com o id do post, o id do **usuário** que o criou além do título e conteúdo do post (sucesso) ou um erro personalizado (falha).

### 8 - Endpoint GET `/post`
- Consulta todos os **posts** disponíveis;
- A requisição deve ser feita com um token recebido ao efetuar o login ou criar um novo usuário;


- Estrutura do retorno:
  ```json
  [
    {
      "id": 1,
      "title": "Post do Ano",
      "content": "Melhor post do ano",
      "userId": 1,
      "published": "2011-08-01T19:58:00.000Z",
      "updated": "2011-08-01T19:58:51.000Z",
      "user": {
        "id": 1,
        "displayName": "Jade Picon",
        "email": "jp@gmail.com",
        "image": "https:link-da-imagem.jpg"
      },
      "categories": [
        {
          "id": 1,
          "name": "Inovação"
        }
      ]
    },
  ]
  ```
- O retorno deve seguir o objeto json especificado (sucesso) ou um erro personalizado (falha).

### 9 - Endpoint GET `/post/:id`
- Consulta o post cujo seja especificado como parâmetro na URL;
- A requisição deve ser feita com um token recebido ao efetuar o login ou criar um novo usuário;
- Estrutura do retorno:
  ```json
  {
    "id": 1,
    "title": "Post do Ano",
    "content": "Melhor post do ano",
    "userId": 1,
    "published": "2011-08-01T19:58:00.000Z",
    "updated": "2011-08-01T19:58:51.000Z",
    "user": {
      "id": 1,
      "displayName": "Galvão Bueno",
      "email": "gb@gmail.com",
      "image": "https://upload.imagem.jpg"
    },
    "categories": [
      {
        "id": 1,
        "name": "Inovação"
      }
    ]
  }
  ```
- O retorno deve seguir o objeto json especificado (sucesso) ou um erro personalizado (falha).

### 10 - Endpoint PUT `/post/:id`
- Permite a edição do post cujo seja especificado como parâmetro na URL;
- OBS: Somente o autor do post pode editar o post;
- A requisição deve ser feita com um token recebido ao efetuar o login ou criar um novo usuário;
- Estrutura da requisição:
  ```json
  {
    "title": "RECUPEROU TUDO!!!11!",
    "content": "João José dá a volta por cima investindo em NFT e bitcoin!"
  }
  ```
- O retorno mostrar o título e conteúdo do post atualizados, além do id do autor e das categorias do post (sucesso) ou um erro personalizado (falha).

### 11 - Endpoint DELETE `/post/:id`
- Permite a deleção do post cujo seja especificado como parâmetro na URL;
- OBS: Somente o autor do post pode deletar o post;
- A requisição deve ser feita com um token recebido ao efetuar o login ou criar um novo usuário;
- A deleção será confirmada com o código de status 204: No Content (sucesso) ou retornará um erro personalizado (falha).

### 12 - Endpoint DELETE `/user/me`
- A requisição deve ser feita com um token recebido ao efetuar o login ou criar um novo usuário;
- O usuário será confirmado através do token repassado e sua deleção será confirmada com o código de status 204: No Content (sucesso) ou retornará um erro personalizado (falha).

### 13 - Endpoint GET `/post/search?q=:searchTerm`
- A requisição deve ser feita com um token recebido ao efetuar o login ou criar um novo usuário;
- Estrutura do retorno:
  ```json
  {
    "id": 1,
    "title": "Post do Ano",
    "content": "Melhor post do ano",
    "userId": 1,
    "published": "2011-08-01T19:58:00.000Z",
    "updated": "2011-08-01T19:58:51.000Z",
    "user": {
      "id": 1,
      "displayName": "Galvão Bueno",
      "email": "gb@gmail.com",
      "image": "https://upload.imagem.jpg"
    },
    "categories": [
      {
        "id": 1,
        "name": "Inovação"
      }
    ]
  }
  ```
- O retorno será um array de **posts** que contenham no título ou conteúdo o termo buscado (sucesso) ou retornará um erro personalizado (falha).

---

# Implementações Futuras
- Criação de uma aplicação Front-End estilizada para consumir a API;