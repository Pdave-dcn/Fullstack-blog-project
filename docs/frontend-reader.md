# Frontend Reader Documentation

## Overview

The **Frontend Reader** is a public-facing blog application designed to deliver a fast, accessible, and engaging reading experience. Built with **React**, **TypeScript**, and **Vite**, it focuses on clean UI composition, responsive design, and efficient data fetching.

The application emphasizes read-only content consumption, with features such as article discovery, detailed article views, and threaded comments. Server state is managed with **TanStack React Query**, while **Zod** and **React Hook Form** ensure robust validation where user input is required. The architecture favors composability and separation of concerns, making the UI easy to maintain and extend as the platform grows.

## Tech Stack

- **Core**: React + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + Shadcn/UI
- **Animations**: Motion
- **State Management**: Zustand (stores), TanStack React Query (server state)
- **Routing**: React Router
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Axios
- **Permissions**: CASL Ability
- **Notifications**: Sonner Toast

## Project Structure

```bash
frontend-reader/
├── src/
│   ├── api/             # API service functions
│   │   ├── article.api.ts
│   │   ├── auth.api.ts
│   │   ├── axios.ts
│   │   └── comment.api.ts
│   ├── components/      # Reusable UI components
│   │   ├── ui/          # Shadcn/UI components
│   │   ├── AboutPage/
│   │   ├── ArticleReadPage/
│   │   ├── ArticlesPage/
│   │   ├── AuthModal/
│   │   ├── Comment/
│   │   ├── Homepage/
│   │   ├── layout/
│   │   ├── ArticleCard.tsx
│   │   ├── LatestArticleCard.tsx
│   │   ├── LoadMoreButton.tsx
│   │   ├── ScrollToTop.tsx
│   │   └── UserMenu.tsx
│   ├── hooks/           # Custom React hooks
│   │   └── useCommentCard.ts
│   ├── lib/             # Utility functions and data
│   │   ├── about-page-data.ts
│   │   ├── animation-variants.ts
│   │   ├── design-tokens.ts
│   │   ├── homepage-data.ts
│   │   ├── utils.ts
│   │   └── security/
│   ├── pages/           # Page components
│   │   ├── About.tsx
│   │   ├── ArticleReadPage.tsx
│   │   ├── Articles.tsx
│   │   ├── Home.tsx
│   │   └── NotFound.tsx
│   ├── queries/         # TanStack Query hooks
│   │   ├── article.query.ts
│   │   ├── auth.query.ts
│   │   └── comment.query.ts
│   ├── store/           # Zustand stores
│   │   ├── auth.store.ts
│   │   └── comment.store.ts
│   ├── types/           # TypeScript type definitions
│   │   └── comment.ts
│   ├── utils/           # Utility functions
│   │   ├── authErrorHandler.ts
│   │   ├── estimatedReadTime.ts
│   │   ├── formatDate.ts
│   │   ├── formatTimeAgo.ts
│   │   ├── getExcerpt.ts
│   │   ├── getInitials.ts
│   │   └── zodErrorHandler.ts
│   └── zodSchemas/      # Zod validation schemas
│       ├── article.zod.ts
│       ├── auth.zod.ts
│       └── comment.zod.ts
```

## Key Features

### Navigation & Layout

- Responsive header with navigation links
- Mobile-friendly design
- Smooth page transitions with Motion
- Scroll to top functionality
- Page wrapper for consistent layout

### Article Reading

- Article list with pagination
- Detailed article view with rich content
- Estimated read time calculation
- Article excerpts and metadata

### User Interaction

- Comment system with nested replies
- User authentication via modal
- User menu with profile options
- Sign-in prompts for restricted content

## Components

### Core Components

- `Header.tsx`: Main navigation and user controls
- `PageWrapper.tsx`: Layout wrapper
- `ArticleCard.tsx`: Article preview card
- `LatestArticleCard.tsx`: Featured article card
- `UserMenu.tsx`: User profile dropdown
- `ScrollToTop.tsx`: Auto-scroll button

### Interactive Components

- `AuthModal.tsx`: Login/Signup modal with form fields
- `Comment/` folder: Full comment system components (CommentCard, CommentForm, etc.)
- `LoadMoreButton.tsx`: Pagination control

### Page-Specific Components

- `Homepage/`: HeroSection, LatestArticlesSection, StatsFeaturesSection
- `AboutPage/`: AboutMeSection, ContactSection, etc.
- `ArticleReadPage/`: ArticleContent, SignInPrompt
- `ArticlesPage/`: ArticlesEmpty, ArticlesSkeleton

## Pages

### Home Page

- Hero section with call-to-action
- Latest articles grid
- Statistics and features
- Newsletter subscription (implied)

### Articles Page

- Article grid layout with load more
- Loading states and skeletons
- Error handling
- Empty states

### Article Read Page

- Full article content with formatting
- Author information
- Comment section with nested replies
- Sign-in prompt for commenting

### About Page

- Site information and author bio
- Contact information
- Social links
- Professional presentation

### Not Found Page

- 404 error handling

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

Handles API data fetching, caching, and mutations for articles, comments, and auth.

## API Integration

The application interacts with the backend API using:

- Axios for HTTP requests
- TanStack React Query for data fetching and caching
- JWT tokens for authentication
- Zod schemas for request/response validation
- Error handling utilities

## Environment Configuration

Required variables in `.env`:

```bash
VITE_API_BASE_URL=http://localhost:3000/api
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

### 5. Preview

```bash
npm run preview
```

## Styling

### Theme Colors

- Primary: Blue (various shades)
- Secondary: Gray scale
- Accent: Purple
- Background: White/Gray gradient
- Text: Dark gray/Black

### Design Patterns

- Consistent spacing with design tokens
- Responsive breakpoints
- Smooth transitions with Motion
- Interactive hover states
- Loading skeletons
- CSS Doodle for decorative elements

## Accessibility

- ARIA labels
- Semantic HTML
- Keyboard navigation
- Color contrast
- Screen reader support

## Performance

- Route-based code splitting
- Image optimization
- Loading states and skeletons
- Memoized components
- Efficient re-renders with TanStack Query
- Estimated read time for articles

## Security

- JWT token management
- CASL Ability for permissions
- Input validation with Zod
- XSS prevention
- Secure authentication flow

## Common Issues & Solutions

1. Authentication Issues:

   - Check token expiration
   - Verify Zustand store persistence
   - Confirm API endpoints

2. Comment System:

   - Verify nested replies functionality
   - Check comment permissions with CASL
   - Handle loading states

3. Navigation:

   - ScrollToTop behavior
   - Route transitions
   - History management

4. Animations:
   - Ensure Motion library is properly imported
   - Check animation variants in lib/

## Future Improvements

1. Dark mode support (next-themes is installed)
2. Social authentication
3. Article bookmarking
4. Advanced search
5. User preferences
6. Newsletter subscription functionality
7. Social sharing features
