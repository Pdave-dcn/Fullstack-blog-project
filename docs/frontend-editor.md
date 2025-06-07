# Frontend Editor Documentation

## Overview

The Frontend Editor is a React-based application built with TypeScript and Vite. It provides a content management interface for blog authors to create, edit, manage posts and moderate comments.

## Tech Stack

- **Core**: React + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Editor**: TinyMCE
- **State Management**: React Context
- **Routing**: React Router
- **UI Components**: Shadcn/UI
- **Notifications**: Sonner Toast

## Project Structure

```
frontend-editor/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── ui/           # Base UI components from shadcn/ui
│   │   └── ...
│   ├── contexts/         # React Context providers
│   │   ├── AuthContext.tsx
│   │   └── ThemeProviderContext.tsx
│   ├── hooks/           # Custom React hooks
│   │   ├── use-auth.ts
│   │   ├── use-dataFetching.ts
│   │   └── ...
│   ├── lib/            # Utility functions
│   ├── pages/          # Page components
│   │   ├── Dashboard/
│   │   ├── Articles/
│   │   └── ...
│   └── types/          # TypeScript type definitions
```

## Key Features

### Authentication & Authorization

- Author-only access
- Protected routes
- JWT-based authentication
- Role-based access control

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
- `CommentSection.tsx`: Comment management
- `Dashboard.tsx`: Analytics and overview
- `Articles.tsx`: Article list and management

## Routing Structure

```typescript
<Routes>
  <Route path="/" element={<Login />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/articles" element={<Articles />} />
  <Route path="/articles/:id" element={<ArticleDetails />} />
  <Route path="/articles/:id/edit" element={<ArticleEdit />} />
  <Route path="/new-article" element={<NewArticle />} />
  <Route path="/comments" element={<Comments />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

## State Management

### Authentication Context

```typescript
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}
```

### Theme Context

```typescript
interface ThemeProviderState {
  theme: string;
  setTheme: (theme: string) => void;
}
```

## API Integration

The application interacts with the backend API using:

- Fetch API for HTTP requests
- JWT tokens for authentication
- Error handling utilities

## Environment Configuration

Required environment variables in `.env`:

```bash
VITE_API_BASE_URL=http://localhost:3000/api
VITE_TINYMCE_API_KEY=your_tinymce_api_key
```

## Development Setup

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

## Code Style & Best Practices

- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Component composition pattern
- Custom hooks for logic reuse
- Error boundaries for error handling

## Performance Considerations

- Lazy loading of routes
- Memoization of expensive computations
- Proper loading states
- Error handling
- Optimistic updates

## Accessibility

- ARIA labels
- Keyboard navigation
- Focus management
- Color contrast compliance
- Screen reader support

## Security

- Protected routes
- JWT token management
- XSS prevention
- CORS configuration
- Input sanitization

## Testing

- Unit tests for utilities
- Component testing
- Integration testing
- E2E testing (recommended)

## Contributing

1. Follow the established code style
2. Add appropriate documentation
3. Include tests for new features
4. Use meaningful commit messages
5. Submit PRs against the development branch

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
