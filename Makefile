#!/bin/bash

# Variables
container_db = goomer-lista-rango-db
container_api = goomer-lista-rango-api

# Default Commands
up:
	docker-compose up --remove-orphans -d --build
	make logs
up-no-logs:
	docker-compose up --remove-orphans -d --build
down:
	docker-compose down
start:
	docker-compose start
stop:
	docker-compose stop
reset:
	docker-compose down --rmi all --volumes
logs:
	docker-compose logs --timestamps --follow --tail="all"
bash:
	docker exec -it $(container_api) /bin/bash

# Commands
restart:
	docker-compose restart $(container_db)
	docker-compose restart $(container_api)
	make logs
install:
	docker exec $(container_api) npm install
build:
	docker exec $(container_api) npm run build
psql:
	docker exec -it $(container_db) /bin/bash -c 'exec psql -U "$${POSTGRES_USER}" -h "$${POSTGRES_HOST}" -p "$${POSTGRES_PORT}" -d "$${POSTGRES_DB}"'
migration:
	docker exec $(container_api) npm run migration:run
migration-run:
	docker exec $(container_api) npm run migration:run
migration-create:
	docker exec $(container_api) npm run migration:create ${migration}
migration-generate:
	docker exec -it $(container_api) npm run migration:create $(name)
lint:
	docker exec $(container_api) npm run lint
test.unit:
	docker exec $(container_api) npm run test
test.unit.coverage:
	docker exec $(container_api) npm run test:cov


