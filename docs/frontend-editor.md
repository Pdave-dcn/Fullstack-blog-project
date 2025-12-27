# Frontend Editor Documentation

## Overview

The **Frontend Editor** is a secure author-facing dashboard designed for managing content in a real-world publishing workflow. Built with **React**, **TypeScript**, and **Vite**, it provides tools for creating, editing, and publishing articles, as well as moderating user comments.

The application integrates a rich text editing experience via **TinyMCE** and enforces `role-based access control` to ensure only authorized authors can access editorial features. It leverages **TanStack React Query** for server state, **Zod** for validation, and **Zustand** for localized client state, resulting in a predictable and scalable architecture. The editor is intentionally structured to mirror patterns found in professional CMS and admin dashboards.

## Tech Stack

- **Core**: React + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Editor**: TinyMCE
- **State Management**: Zustand (stores), TanStack React Query (server state), React Context (themes/auth)
- **Routing**: React Router
- **UI Components**: Shadcn/UI
- **Forms**: React Hook Form + Zod validation
- **Notifications**: Sonner Toast
- **Permissions**: CASL Ability
- **HTTP Client**: Axios

## Project Structure

```bash
frontend-editor/
├── src/
│   ├── api/             # API service functions
│   │   ├── article.api.ts
│   │   ├── auth.api.ts
│   │   ├── axios.ts
│   │   ├── comment.api.ts
│   │   └── dashboard.api.ts
│   ├── components/      # Reusable UI components
│   │   ├── ui/          # Base UI components from shadcn/ui
│   │   ├── ArticleEditPage/
│   │   ├── ArticleReadPage/
│   │   ├── ArticlesPage/
│   │   ├── Comment/
│   │   ├── CommentsPage/
│   │   ├── Dashboard/
│   │   ├── layout/
│   │   ├── NewArticlePage/
│   │   ├── LoadMoreButton.tsx
│   │   ├── ModeToggle.tsx
│   │   └── ProtectedRoute.tsx
│   ├── contexts/        # React Context providers
│   │   └── ThemeProviderContext.tsx
│   ├── hooks/           # Custom React hooks
│   │   ├── use-mobile.ts
│   │   ├── use-sidebar.ts
│   │   ├── useArticles.ts
│   │   ├── useCommentCard.ts
│   │   ├── useDashboard.ts
│   │   └── useDebounce.ts
│   ├── lib/             # Utility functions
│   │   ├── utils.ts
│   │   └── security/
│   │       └── ability.ts
│   ├── pages/           # Page components
│   │   ├── ArticleEdit.tsx
│   │   ├── ArticleReadPage.tsx
│   │   ├── Articles.tsx
│   │   ├── Comments.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Login.tsx
│   │   ├── NewArticle.tsx
│   │   └── NotFound.tsx
│   ├── queries/         # TanStack Query hooks
│   │   ├── article.query.ts
│   │   ├── auth.query.ts
│   │   ├── comment.query.ts
│   │   └── dashboard.query.ts
│   ├── stores/          # Zustand stores
│   │   ├── auth.store.ts
│   │   └── comment.store.ts
│   ├── utils/           # Utility functions
│   │   ├── formatDate.ts
│   │   ├── formatTimeAgo.ts
│   │   ├── getInitials.ts
│   │   └── zodErrorHandler.ts
│   └── zodSchemas/      # Zod validation schemas
│       ├── article.zod.ts
│       ├── auth.zod.ts
│       ├── comment.zod.ts
│       └── dashboard.zod.ts
```

## Key Features

### Authentication & Authorization

- Author-only access
- Protected routes
- JWT-based authentication
- Role-based access control with CASL Ability

### Content Management

- Create new articles
- Edit existing articles
- Delete articles
- Draft/publish workflow
- Rich text editing with TinyMCE

### Comment Moderation

- View all comments
- Delete inappropriate comments
- Navigate to comment context
- Comment metrics

### Dashboard

- Post statistics
- Recent activity
- Quick access to common actions
- Performance metrics

## Components

### Layout Components

- `Layout.tsx`: Main layout wrapper
- `Header.tsx`: Top navigation bar
- `AppSidebar.tsx`: Navigation sidebar
- `ProtectedRoute.tsx`: Auth wrapper

### Feature Components

- `ArticleEdit.tsx`: Article editing interface
- `Comments.tsx`: Comment management
- `Dashboard.tsx`: Analytics and overview
- `Articles.tsx`: Article list and management
- `NewArticle.tsx`: New article creation
- `ArticleReadPage.tsx`: Article reading interface

### UI Components

- Various Shadcn/UI components in `ui/` folder
- Custom components like `LoadMoreButton`, `ModeToggle`

## State Management

### Authentication Store (Zustand)

```typescript
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  ability: AppAbility | null;
  login: (user: User) => void;
  logout: () => void;
}
```

### Comment Store (Zustand)

Manages comment-related state.

### Server State (TanStack React Query)

Handles API data fetching, caching, and mutations for articles, comments, dashboard, etc.

### Theme Context

```typescript
interface ThemeProviderState {
  theme: string;
  setTheme: (theme: string) => void;
}
```

## API Integration

The application interacts with the backend API using:

- Axios for HTTP requests
- TanStack React Query for data fetching and caching
- JWT tokens for authentication
- Zod schemas for request/response validation
- Error handling utilities

## Environment Configuration

Required environment variables in `.env`:

```bash
VITE_API_BASE_URL=http://localhost:3000/api
VITE_TINYMCE_API_KEY=your_tinymce_api_key
```

## Development Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Start development server

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

### 4. Lint

```bash
npm run lint
```

## Code Style & Best Practices

- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting (via ESLint)
- Component composition pattern
- Custom hooks for logic reuse
- Error boundaries for error handling
- Zod for schema validation
- React Hook Form for form management

## Performance Considerations

- Lazy loading of routes
- Proper loading states
- Error handling
- Optimistic updates with TanStack Query
- Debounced inputs

## Security

- Protected routes
- JWT token management
- XSS prevention
- Input sanitization
- CASL Ability for fine-grained permissions

## Common Issues & Solutions

1. Authentication issues:

   - Check token expiration
   - Verify correct API endpoints
   - Confirm role permissions

2. Editor problems:

   - Verify TinyMCE API key
   - Check content sanitization
   - Ensure proper initialization

3. Routing issues:

   - Check protected route wrapping
   - Verify path parameters
   - Confirm navigation guards

4. State management issues:
   - Ensure Zustand stores are properly persisted
   - Check TanStack Query cache invalidation
   - Verify Context providers are wrapped correctly
