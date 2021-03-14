# Starter

Isomoprhic React Application.

## Table of contents
- [Starter](#starter)
  - [Table of contents](#table-of-contents)
  - [Getting Started:](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installing](#installing)
    - [Database](#database)
  - [Running the tests](#running-the-tests)
    - [Unit tests](#unit-tests)
    - [Linter](#linter)
  - [Deployment:](#deployment)
  - [Built with](#built-with)
  - [Authors](#authors)
  - [License](#license)

## Getting Started:

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

To start this project you need `npm`, `node`, `postgresql` database and `linux` system.

Recommended: `docker`, `docker-compose`

### Installing

To install packages:

`npm install`

To generate prisma types:

`npx prisma generate`

To deploy existing migrations:

`prisma migrate deploy --preview-feature `

To seed database:

`npx prisma db seed --preview-features`

To run development envinronment use

`npm run dev`

Webpack.ts will build and launch application.

### Database
For a development you need user with permission to create a database.

Migration

`npx prisma migrate dev --preview-feature --name {name}` where {name} is a name of migration

Reset

`npx prisma migrate reset --preview-feature`

Deploy

`prisma migrate deploy --preview-feature `

## Running the tests
### Unit tests
Test and generate coverage report:

`npm run test`

Test, watch and generate coverage report:

`npm run test:watch`

### Linter
Run linter and if possible, fix:

`npm run lint`

Linter with max warning set to 0:

`npm run linter-no-warnings`
## Deployment:

If you want to deploy your app on live system use:

`npm run build`

It will check your code and build the application.

To start it use:

`npm run start`

You can also build docker image:

`docker build -t [name] .`


## Built with

- [Webpack](https://webpack.js.org/)
- [Node.js](https://nodejs.org/en/)
- [Express](https://www.npmjs.com/package/express)
- [React](https://reactjs.org/)
- [Babel](https://babeljs.io/)
- [Typescript](https://www.typescriptlang.org/index.html)
- [SASS](https://sass-lang.com/)
- [Eslint](https://eslint.org/)
- [Prisma](https://www.prisma.io/)

## Authors
- **Artur Bednarczyk** - *Initial work* -  [Isur](https://github.com/isur)

## License

This project is licensed under the MIT License
