<h1 align="center">CRUD DE USUÁRIOS</h1>

<h2>Sobre o projeto</h2>
<p>
Este crud de usuários é uma aplicação que permite a criação/alteração/remoção/pesquisa de usuários em uma base de dados e permite que somente administradores autenticados realizem o gerenciamento de cadastro destes usuários.

Esta API é pública e portanto possui cadastro e autenticação de administradores, com utilização do JWT (Json Web Token), de modo que somente administradores autenticados podem consultar, adicionar, deletar e alterar usuários.

<p>

<h2>Funcionalidades</h2>
<p>
Os usuários são cadastrados no sistema pelos administradores autenticados. Os dados para cadastro de um usuário é:
<p>- nome </p>
<p>- email </p>
<p>
<p>Após a realização do cadastro, é possível que os administradores efetuem algumas ações:<p>
<p>- Adição de novos usuários na base de dados</p>
<p>- Consulta de todos os usuários cadastrados na base de dados</p>
<p>- Consulta de usuários específicos </p>
<p>- Substituição de nome ou email de um determinado usuário </p>
<p>- Exclusão de usuários </p>
<p>
<h2> Pré Requisitos </h2>
<p>Antes de começar, é necessário ter instalado em sua máquina as seguintes ferramentas:</p>

<p>- GIT</p>
<p>- Node.js versão 14.15.4 ou superior</p>
<p>- Mysql Workbench versão 8.0</p>

É importante ainda seguir os seguintes passos:
- Clonar este repositório;
- Acessar a pasta do projeto;
- Instalar as dependências através do comando: npm install;
- Rodar a script para criação da database no banco: npx sequelize db:create;
- Rodar script para criação das tabelas do banco de dados: npx sequelize migration:create --name=create-users
- Iniciar o servidor;
<p>

<h2> Autenticação e criação de usuário </h2>
Um cadastro de usuário e autenticação inicial são necessárias para realizar os testes local:

Para CADASTRO de um administrador da API é necessário fazer:
```
- Acessar o endpoint /administrators/cadastro
- Através do método POST enviar email e senha em formato JSON 
- Este e-mail e senha serão enviados para a tabela administrators do banco de dados local.
```

Para realização do LOGIN, é necessário:

```
- Acessar o endpoint /administrators/login
- Através do método POST entrar com email e senha cadastrados, em formato JSON. 
- Posteriormente será gerada uma chave token. 
- Esta chave token deve ser usada para o acesso à todas as requisições da API
- Levando em conta que a API seja testada através do INSOMNIA, a chave deve ser inserida na aba 'Authorization', onde deve ser selecionada também o seu tipo, como sendo: Bearer Token
- Após isso, o administrador cadastrado está autorizado e autenticado para realizar as requisições
```

<h2> Requisições </h2>
Após os serviços e aplicação rodando, é necessário acessar http://localhost:3000 para desenvolvimento e teste da API. Todos os endpoints estão demonstrados abaixo:

<p>/users </p>
<p>/users/id_user </p>
<p>/administrator </p>
<p>/administrator/id_administrator</p>
<p>

<p>Neste ítem serão feitas algumas considerações pertinentes adotadas nesta aplicação, no que se refere às requisições:</p>
<p>- GET - Quando possuem, os parâmetros são enviados junto a URL </p>
<p>- POST - Parâmetros são enviados no corpo da requisição </p>
<p>- PUT - O id do cliente é enviado na URL e o nome e email no corpo da requisição </p>
<p>- DELETE - O id do cliente é enviado na URL </p>

<h2> Testes </h2>
Foram desenvolvidos testes de integração para a presente API fazendo-se uso da biblioteca JEST, versão 26.6.3. Os testes englobam todas as rotas, sendo: users e administrator. 
Para dar início aos testes, basta digitar no console.log: "npm test".

<h2>Tecnologias</h2>
As seguintes ferramentas foram usadas na construção do projeto:

<p><b>Dependências</b></p>

- bcrypt - versão 5.0.0 </p>
- body-parser - versão 1.19.0 </p>
- dotenv - versão 8.2.0 </p>
- express - versão 4.17.1 </p>
- jsonwebtoken - versão 8.5.1 </p>
- morgan - versão 1.10.0 </p>
- mysql2 - versão 2.2.5 </p>
- jest - versão 26.6.3  </p>
- nock - versão 13.0.7 </p>
- supertest - versão 6.1.3 </p>
- sequelize - versão 6.5.0 </p>
- sequelize-cli - versão 6.2.0 </p>

</p>

<p><b>Utilitários</b></p> 

- Editor - Visual Studo Code </p>
- Teste de API - Insomnia </p>

<h2><b>Autor</b></h2>
<p>Elder Nogueira da Silva</p>
