# Goomer Lista Rango

## Descrição
Projeto criado com o intuito de responder ao desafio técnico da Goomer.

## Funcionalidades
- Listar todos os restaurantes
- Cadastrar novos restaurantes
- Listar os dados de um restaurante
- Alterar os dados um restaurante
- Excluir um restaurante
- Listar todos os produtos de um restautante
- Criar um produto de um restaurante
- Alterar um produto de um restaurante
- Excluir um produto de um restaurante

### Pré-requisitos
- Docker instalado na máquina local.

## Como executar localmente
Você pode executar o projeto localmente utilizando os comandos do Docker Compose padrão ou os seguintes comandos do Makefile:

- `make up`: Inicia os contêineres do Docker e constrói as imagens, exibindo os logs.
- `make up-no-logs`: Inicia os contêineres do Docker e constrói as imagens, sem exibir os logs.
- `make down`: Para e remove os contêineres do Docker.

Exemplo de uso:

```bash
# Iniciar os contêineres e exibir os logs
make up

# Iniciar os contêineres sem exibir os logs
make up-no-logs

# Parar os contêineres
make down
```

## Tecnologias Utilizadas

- **NestJS**: Framework para construção de aplicativos Node.js escaláveis e eficientes.
  - Foi utilizado para ter um melhor controle nas rotas HTTP.
  
- **TypeORM**: ORM (Object-Relational Mapping) para TypeScript e JavaScript que suporta vários bancos de dados relacionais. 
  - Utilizei para gerenciar a conexão com o banco de dados, deixando suas configurações de forma isolada para poderem ser substituídas sem problemas.

- **PostgreSQL**: Sistema de gerenciamento de banco de dados relacional de código aberto e altamente extensível.

## Rotas
As rotas estão documentadas com exemplos de execução no arquivo `docs/api.http`. 

- Listar todos os restaurantes:
- POST /api/restaurants
- GET /api/restaurants
- GET /api/restaurants/:id
- PATCH /api/restaurants/:id
- DELETE /api/restaurants/:id

- Gerenciar produtos de um restaurante:
- POST /api/restaurants/:restaurantId/products
- GET /api/restaurants/:restaurantId/products
- PATCH /api/restaurants/:restaurantId/products/:id
- DELETE /api/restaurants/:restaurantId/products/:id

## Melhorias

Algumas melhorias precisam ser feitas no projeto:

### Upload de Imagem
O sistema atualmente só recebe uma URL para armazenar a imagem. Uma melhoria seria ajustar o sistema para receber a imagem diretamente e armazená-la em um storage. Isso permitiria gerar uma URL para a imagem disponível posteriormente.

### Testes Unitários
Os testes unitários precisam ser ajustados para melhor cobertura e garantia de qualidade do código.

<!-- Nest is [MIT licensed](LICENSE). -->