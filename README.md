# Residency Match

See our [website](https://residencymatch.net/).

## Local Development Setup

Have npm installed.

```shell
resmatch/backend $ npm install
resmatch/frontend $ npm install
```

Create the file `backend/.env`.

```shell
DATABASE_URL=postgresql://user:postgres@localhost:5432/resmatch?schema=public
SECRET_KEY=[random_key]
MAILGUN_API_KEY=[mailgun_api_key]
FRONTEND_URL=http://localhost:5173/
GOOGLE_CLIENT_ID=[google_client_id]
GOOGLE_CLIENT_SECRET=[google_client_secret]
```

Create the file `frontend/.env.local`.

```shell
VITE_API_URL=http://localhost:3000/
```

## Running the application

Open two terminals, one for each process.

```shell
resmatch/backend $ npm start
resmatch/frontend $ npm run dev
```

In the browser, navigate to http://localhost:5173/, or the url you defined in
the backend env file.

## Migrating the database

- Make sure postgres is up and running.
- Navigate to `backend/prisma/schema.prisma`.
- Update schemas as needed.
- Run `npx prisma migrate dev --name [name]`, where name is used for the output
  migration script file name.
- You should also be able to deploy it with `npx prisma migrate deploy`. 