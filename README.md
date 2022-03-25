# Sumário

- [Sobre o Projeto](#sobre-o-projeto)
  - [Principais tecnologias](#principais-tecnologias)
  - [Notas](#notas)
  - [OBS](#obs)
- [Objetivos](#Objetivos)
- [Lista de objetivos](#lista-de-objetivos)
  - [1 - Testes Unitários](#1---testes-unitários)
  - [2 - Endpoints GET `/products e products/:id`](#2---endpoints-GET-products-e-productsid)
  - [3 - Endpoint POST `/products`](#3---endpoint-POST-products)
  - [4 - Endpoint PUT `/products/:id`](#4---endpoint-PUT-productsid)
  - [5 - Endpoint DELETE `/products`](#5---endpoint-DELETE-products)
  - [6 - Endpoints GET `/sales e sales/:id`](#6---endpoints-GET-sales-e-salesid)
  - [7 - Endpoint POST `/sales`](#7---endpoint-POST-sales)
  - [8 - Endpoint PUT `/sales/:id`](#8---endpoint-PUT-salesid)
  - [9 - Endpoint DELETE `/sales`](#9---endpoint-DELETE-sales)
  - [10 - Controle de Estoque](#10---controle-de-estoque)
  [Implementações Futuras](#implementações-futuras )


# Sobre o Projeto 

-O objetivo final do projeto é concluir uma aplicação de Backend CRUD funcional que maneje as operações de uma loja ficcional.
-O desenvolvimento deve seguir as regras do modelo `MSC` e o padrão `REST`. Erros devem ser seguidos de mensagens personalizadas e o devido e adequado código do status.
-Testes Unitários devem ser realizados para acompanhar o desenvolvimento seguro da aplicação.


## Principais tecnologias:

 - NodeJS;
 - MySQL;
 - Express;
 - Testes Unitários: Sinon, Chai;
 - Joi;


## Notas
- Caso deseje testar o projeto localmente o repositório acompanha um schema .sql para facilitar a implementação da aplicação.
- O projeto requer o uso das seguintes variáveis de ambiente para o devido funcionamento:
`host: process.env.HOSTNAME`
`user: process.env.MYSQL_USER`
`password: process.env.MYSQL_PASSWORD`
`jwt_secret: process.env.JWT_SECRET`

## OBS:
 - Todos os endpoints devem retornar erros com os devidos códigos referentes ao status do erro.
---
# Lista de objetivos:

## 1 - Testes Unitários
- Realização de testes para acompanhar o desenvolvimento da aplicação.
- O comando `npm run test:mocha` mostra o percentual da aplicação completo pelos testes.

## 2 - Endpoints GET `/products` e `/products/:id`
- O retorno do endpoint deve retornar um array de objetos com todos os produtos (/products) ou um objeto com o produto especificado (/products/:id);
- Estrutura do retorno:
  ```json
  [
    {
      "id": 1,
      "name": "Bola quadrada",
      "quantity": 10
    },
    {
      "id": 2,
      "name": "Havaiana de pau",
      "quantity": 20
    }
  ]
  ```

  ```json
  {
    "id": 1,
    "name": "Bola quadrada",
    "quantity": 10
  }
  ```

## 3 - Endpoint POST `/products`
- Será validado se o cadastro de um produto foi feito com os dados corretos;
- A verificação dos dados deve ser realizada por um middleware;
- Estrutura da requisição `/products`:
  ```json
  {
    "name": "Bola quadrada", // name.length > 5
    "quantity": 100
  }
  ```
- O retorno bem sucedido será o objeto acompanhado do Id de cadastro.
 
## 4 - Endpoint PUT `/products/:id`
- Permite atualizar um produto já cadastrado, seguindo as regras já estabelecidas;
- O produto atualizado é observado através do id no parâmetro da URL;
- Estrutura da requisição:
  ```json
  [
    {
    "name": "Bola quadrada",
    "quantity": 100 // quantity > 0
    }
  ]
  ```
- O retorno bem sucedido será o objeto acompanhado do Id do produto alterado.

 
## 5 - Endpoint DELETE `/products`
- Deleta um produto do banco de dados;
- O endpoint uma mensagem informando a deleção do produto e o status correspondente.


## 6 - Endpoints GET `/sales` e `/sales/:id`
- O retorno do endpoint deve retornar um array de objetos com todos os produtos (/sales) ou um objeto com o produto especificado (/sales/:id);
- Estrutura do retorno:
  ```json
  [
    {
      "saleId": 1,
      "date": "2021-09-09T04:54:29.000Z",
      "productId": 1,
      "quantity": 2
    },
    {
      "saleId": 2,
      "date": "2021-09-09T04:54:54.000Z",
      "productId": 2,
      "quantity": 2
    }
  ]
  ```

  ```json
  [
    {
      "date": "2021-09-09T04:54:29.000Z",
      "productId": 1,
      "quantity": 2
    },
    {
      "date": "2021-09-09T04:54:54.000Z",
      "productId": 2,
      "quantity": 2
    }
  ]
  ```

## 7 - Endpoint POST `/sales`
- Será validado se o cadastro de uma venda foi feito com os dados corretos;
- A verificação dos dados deve ser realizada por um middleware;
- Estrutura da requisição `/sales`:
  ```json
  [
    {
      "productId": 1, // deve corresponder a um produto real no banco de dados
      "quantity": 3
    },
    {
      "productId": 2,
      "quantity": 5
    }
  ]
  ```
- O retorno bem sucedido será um objeto com o Id da venda cadastrada e um array contendo os items da venda descritos na requisição.

## 8 - Endpoint PUT `/sales/:id`
- Permite atualizar uma venda já cadastrada, seguindo as regras já estabelecidas;
- A venda que será atualizada deve ser observada através do id no parâmetro da URL;
- Estrutura da requisição:
  ```json
  [
    {
      "productId": 1,
      "quantity": 6
    }
  ]
  ```
- O retorno bem sucedido será o objeto acompanhado do Id da venda alterado.

 
## 9 - Endpoint DELETE `/sales`
- Deleta um produto do banco de dados;
- O endpoint uma mensagem informando a deleção do produto e o status correspondente.

## 10 - Controle de Estoque
- A realização de novas vendas, a deleção ou atualização de vendas deve refletir na quantidade disponível em estoque do produto - que é controlado pelo banco de dados;
- A regra de negócio deve ser aplicada na camada correta;
- Não deve ser possível fechar uma venda caso não haja estoque disponível.
- Não deve haver uma quantidade negativa de produtos.

---

# Implementações Futuras
- Uso de JWT alteração do estoque;
- Alteração do código base para uso do Typescript;