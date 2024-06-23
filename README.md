## Projeto para avaliação da matéria Desafio Profissional V 🚀

### Trabalho realizado por:

- Alison Luiz da Silva - RA: 22033281-2
- Andre Fragalli Vassoler - RA: 22012716-2
- Felipe Cesar Tomazoti de Souza - RA: 22019977-2

 ___  
 
Este é um projeto de avaliação do segundo bimestre da matéria Desafio Profissional V, onde é feito uma busca em API externa consumindo ao menos 50 itens para popular a base de dados.

Tecnologias utilizadas neste projeto:

- Backend: NestJS, TypeORM, PostgreSQL, Docker

## Dependências 📦

[Docker](https://www.docker.com/)
[PostgreSQL](https://www.postgresql.org/)

## Iniciando o projeto 🚩

```bash
$  git clone https://github.com/alison-luiz/esoft_prova_dp_v
```  

#### 1. Usar o docker-compose.yml para compilar o projeto e iniciá-lo (na pasta raiz)

```bash
$  docker compose up --build
```

---

#### 2. Usar o gerenciador de pacotes [Yarn](https://yarnpkg.com/) para executar o backend em modo de desenvolvimento

#### Obs: Para iniciar no modo de desenvolvimento, fazer uma cópia do `.env.example` para `.env`, e preencher a informação da conexão com banco de dados.

**Backend 🌐**

```bash
$  yarn
$  yarn start:dev
```

## Semeando o banco de dados 🌾

Com o servidor rodando, é preciso popular as informações iniciais do nosso banco de dados com os itens buscado mediante API externa.

Para isso basta acessar a rota abaixo, e executá-la.

 - Seed - Buscar API Cartola - http://localhost:3000/teams/seed

![image](https://github.com/alison-luiz/esoft_prova_dp_v/assets/89758128/d08995dc-167b-429f-a803-f69c516de03a)

## Testes 🕵️

#### Para executar os testes e2e e autocannon, primeiro rode o projeto. (passo 1 ou 2)

Para rodar a série de testes feitos no backend, você pode digitar o comando abaixo.
Obs.: Importante semear o banco de dados para os testes de carga

```bash
$  yarn test:e2e
$  yarn test:autocannon
```

## Documentação/Endpoints 📰

Foi disponibilizado os arquivos de environment e collection da ferramenta [postman](https://www.postman.com/) contendo todos os endpoints feitos neste projeto.

[Collection](https://github.com/alison-luiz/esoft_prova_dp_v/blob/main/postman/DP%20V%20-%20Prova%202%C2%BA%20bimestre.postman_collection.json)
[Environment](https://github.com/alison-luiz/esoft_prova_dp_v/blob/main/postman/DP%20V%20-%20Prova%202%C2%BA%20bimestre.postman_environment.json)  

Também contamos com uma documentação feita pelo [swagger](https://swagger.io/) que está disponibilizada na seguinte rota da API:  

http://localhost:3000/docs/

![image](https://github.com/alison-luiz/esoft_prova_dp_v/assets/89758128/b075eee5-5bdc-40a0-aebe-fce455086c47)
