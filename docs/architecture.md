# Architecture Overview

The project is organized as a monorepo with three main workspaces:

```
blog-project/
│
├── api/                # Backend API
│
├── frontend-reader/    # Public-facing reader app
│
└── frontend-editor/    # Authenticated editor dashboard
```

## Data Flow

- Frontends send HTTP requests to the API.
- API uses Prisma to interact with the PostgreSQL database.
- JWT is used for authenticating and authorizing requests.

## Technologies

- Frontends: Vite, React, Tailwind, Framer Motion
- Backend: Node.js, Express, Prisma, Passport.js
- Database: PostgreSQL
