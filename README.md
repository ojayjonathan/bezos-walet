# Neo.Tax Take-home Starter Code
This is the repo for the starter code for the Neo.Tax take-home assignment. Out of the box, this code implements the [Bezos wallet](https://neo-tax.notion.site/Starter-Code-Overview-Bezos-Wallet-59f7bee0d4664d69a734447cf9eaa95c?pvs=4).

---
## Tech Stack

- React + [Material UI](https://mui.com/)
- Node.js (v17) + [express](https://www.npmjs.com/package/express)
- REST
- Postgres + [Prisma](https://www.prisma.io/)

### Prisma

Prisma is a Typescript ORM compatible with Postgres and a whole host of other databases. In this app, we use Prisma for all of our interactions with the database.

If you're unfamiliar with Prisma, here are a few pointers to help you get up to speed:
- [Prisma Quickstart Guide](https://www.prisma.io/docs/getting-started/quickstart)
    - [Guide on how to add to an existing Prisma project](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases-typescript-postgresql)
- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)

## How To Run Locally

### Database Setup
To run the app locally, you'll need to install Postgres; on MacOS, we recommend using Homebrew:
```bash
brew install postgresql
```

Locally, Prisma will expect a `.env` file that contains a `DATABASE_URL` environment
variable to connect to the database; here's an example:
```
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL="postgresql://user:password@localhost:5432/database_name?schema=public"
```

If you want to run the seed script that populates the database with initial
data, run `npm run db:seed`. 

Here are some other database commands that might come in handy:

- `npm run db:migration:generate [name_of_migration_file]`: This command will
use the `prisma` CLI to automatically generate a new migration file for you.
- `npm run db:migration:deploy`: This will apply the migration to your local database.

### Remaining setup

Once your local environment is set up, simply run `npm install` to install the
dependencies.  Then, you can run the app using `npm run dev` from the project
root. The webserver will run on port 8080, and the server will run on port 3000.

## How To Run a Containerized Deployment Build

We've also provided you with a Dockerized version of the app. (Make sure you
have [Docker](https://www.docker.com/) installed before moving forward.) From
the project root, run the following commands:

1. `npm run build:image`
1. `npm run start:image:seed` (This is only for the first time.)

For all subsequent runs, you can use `npm run start:image`.

You can access the website at [http://localhost:8080/](http://localhost:8080/). To view changes, simply reload your browser page.

## How To Run A Containerized Dev Environment

Similarly, we've provided a _development_ version of the Dockerized app that supports hot reloading: if you make changes in the code while the Docker container is running, the container will automatically detect those changes without requiring a restart of the webserver or backend server. From the project root, run: 

1. `npm run build-dev:image`
1. `npm run start-dev:image:seed` (This is only for the first time.)

For all subsequent runs, you can use `npm run start-dev:image`.

Again, you can access the website at [http://localhost:8080/](http://localhost:8080/). This page should update automatically when the client source code changes. The server also transpiles and restarts automatically when its source code changes.

**Note**: You can safely shut down your docker images using `npm run stop-docker` and clean up the build folder (if running the development version) using `npm run clean`.
# bezos-walet
