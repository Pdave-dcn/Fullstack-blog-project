# Setup Guide

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- PostgreSQL (local or remote instance)
- Git
- Terminal/Command Prompt

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/Pdave-dcn/Fullstack-blog-project
cd blog-project
```

### 2. Environment Configuration

1. Navigate to each workspace directory (api, frontend-reader, frontend-editor)
2. Copy the `.env.example` file to create a new `.env` file:

```bash
cp .env.example .env
```

3. Update the environment variables in each `.env` file with your configuration

### 3. Start Development Servers

#### From root

```bash
npm run dev --workspace api
npm run dev --workspace frontend-reader
npm run dev --workspace frontend-editor
```

#### API Server

```bash
cd api
npm install
npm run dev
```

The API will start on <http://localhost:3000>

#### Frontend Applications

Reader Frontend:

```bash
cd frontend-reader
npm install
npm run dev
```

Will start on <http://localhost:5173>

Editor Frontend:

```bash
cd frontend-editor
npm install
npm run dev
```

Will start on <http://localhost:5174>

### 4. Verify Installation

1. Database Connection:

   - Open <http://localhost:3000/api/posts>
   - Should return an array of posts (empty if no data)

2. Frontend Access:
   - Reader: <http://localhost:5173>
   - Editor: <http://localhost:5174>

## Troubleshooting

If you encounter any issues:

1. Check if all prerequisites are properly installed
2. Verify environment variables are correctly set
3. Ensure PostgreSQL service is running
4. Check console for error messages

## Additional Resources

- [API Documentation](./api.md)
- [Frontend Editor Documentation](./frontend-editor.md)
- [Frontend Reader Documentation](./frontend-reader.md)
