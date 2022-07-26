## Main technologies with which this project was developed:

- NodeJS
- NestJS
- PostgreSQL

## Installation

```bash
$ npm install
```

## Running with docker

```bash
# Docker with all services # development
$ docker compose -f "docker-compose.yml" up -d --build

# Docker with only the database
$ docker compose -f "docker-compose.dev.yml" up -d --build


```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## API

```bash


# API url
$ http://localhost:3001/

# API Documentation with Swagger
$ http://localhost:3001/api

```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Documentation

```bash
# Create code documentation
$ npm run doc
```
