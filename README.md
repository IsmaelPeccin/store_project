# Seja bem vindo ao repositório do projeto Store!

## Objetivo

O Projeto Store tem por objetivo criar uma API simples que simula entradas e saídas do estoque de uma loja.
Elaborando esta API, pude aprimorar as seguintes habilidades: 

- Entender o funcionamento da camada de Model;
- Delegar responsabilidades específicas para essa camada;
- Conectar uma aplicação com diferentes bancos de dados;
- Estruturar uma aplicação em camadas;
- Delegar responsabilidades específicas para cada parte do app;
- Melhorar manutenibilidade e reusabilidade do meu código;
- Entender e aplicar os padrões REST;


---

## Desenvolvimento 

O projeto foi desenvolvido utilizando a arquitetura MSC (Models, Services caso necessário, e Controllers).
Foram realizadas as operações básicas que se pode fazer em um determinado banco de dados: Criação, Leitura, Atualização e Exclusão (CRUD). 
O projeto foi criado em NodeJs, utilizando Express, TypeScript, MySQL e algumas bibliotecas, como Joi, Ts-node-dev, express-async-errors.
Todos os endpoints foram desenvolvidos no padrão REST.
 

Sinta -se a vontade para clonar o projeto!

Para clonar o projeto, basta seguir os seguintes passos:

1. Clone o repositório e acesse a pasta 
  - `store_project`
  
2. Intale as dependências
  - `npm install` 
  - 
Há um arquivo `.env.example` na raíz do projeto, onde estão especificadas as varíaveis de ambiente utilizadas no projeto, é necessário configura-las para que a conexão com o banco seja realizada com sucesso.

Na raiz do projeto encontra-se o arquivo `Store.sql` é possível importá-lo localmente para testar o comportamento dos endpoints da aplicação, através de apps como Insomnia e Postman.
No arquivo se encontra as seguintes tabelas e seus relacionamentos:

`products`
`sales`
`sales_products`
`purchase`
`purchase_products`.



