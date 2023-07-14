# SDT Backend Test

Stack:

- Express
- Prisma (for schema & type generation)
- Kysely (database query)
- MySQL

### How to run

Requirement:

- Node v18 ++ (for build in `fetch` support)
- MySQL database

Step:

- copy .env.example to .env
- add DB_URL in .env
- run `npm i`
- run migration with `npm run migrate`
- run seed script with `npm run seed` for location data
- run locally with `npm run dev`
