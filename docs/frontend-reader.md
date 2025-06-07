# Frontend Reader Documentation

## Overview

The Frontend Reader is a React-based blog platform built with TypeScript and Vite. It provides an engaging reading experience with features like article browsing, comments, and user authentication.

## Tech Stack

- **Core**: React + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + Shadcn/UI
- **Animations**: Framer Motion
- **State Management**: React Context
- **Routing**: React Router
- **Notifications**: Sonner Toast

## Project Structure

```
frontend-reader/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── ui/           # Shadcn/UI components
│   │   ├── Header.tsx    # Main navigation
│   │   ├── Footer.tsx    # Site footer
│   │   └── ...
│   ├── contexts/         # React Context providers
│   │   └── AuthContext.tsx
│   ├── hooks/           # Custom React hooks
│   │   ├── use-auth.ts
│   │   └── use-dataFetching.ts
│   ├── pages/          # Page components
│   │   ├── Home.tsx
│   │   ├── Articles.tsx
│   │   ├── ArticleDetails.tsx
│   │   └── About.tsx
│   └── types/          # TypeScript type definitions
```

## Key Features

### Navigation & Layout

- Responsive header with navigation links
- Mobile-friendly design
- Smooth page transitions
- Scroll to top functionality

### Article Reading

- Article list
- Detailed article view
- Rich text formatting

### User Interaction

- Comment system with nested replies
- User authentication
- Newsletter subscription

### Visual Design

- Modern, clean interface
- Animated components
- Loading states and skeletons
- Error handling UI

## Components

### Core Components

- `Header.tsx`: Main navigation and auth controls
- `Footer.tsx`: Site footer with links and newsletter
- `ArticleCard.tsx`: Article preview card
- `CommentSection.tsx`: Comment functionality

### Interactive Components

- `AuthModal.tsx`: Login/Signup modal
- `UserMenu.tsx`: User profile dropdown
- `CommentForm.tsx`: Comment input interface
- `ScrollToTop.tsx`: Auto-scroll functionality

## Pages

### Home Page

- Hero section with call-to-action
- Featured articles
- Topic categories
- Newsletter subscription

### Articles Page

- Article grid layout
- Loading states
- Error handling
- Empty states

### Article Details

- Full article content
- Author information
- Comment section
- Social sharing

### About Page

- Site information
- Author bio
- Contact information
- Social links

## State Management

### Authentication Context

```typescript
interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}
```

## API Integration

Uses the backend API with:

- Fetch API for HTTP requests
- JWT token authentication
- Error handling
- Loading states

## Environment Configuration

Required variables in `.env`:

```bash
VITE_API_BASE_URL=http://localhost:3000/api
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

## Styling

### Theme Colors

- Primary: Blue (various shades)
- Secondary: Gray scale
- Accent: Purple
- Background: White/Gray gradient
- Text: Dark gray/Black

### Design Patterns

- Consistent spacing
- Responsive breakpoints
- Smooth transitions
- Interactive hover states
- Loading skeletons

## Accessibility

- ARIA labels
- Semantic HTML
- Keyboard navigation
- Color contrast
- Screen reader support

## Performance

- Route-based code splitting
- Image optimization
- Loading states
- Memoized components
- Efficient re-renders

## Common Issues & Solutions

1. Authentication Issues:

   - Check token expiration
   - Verify localStorage persistence
   - Confirm API endpoints

2. Comment System:

   - Verify nested replies
   - Check comment permissions
   - Handle loading states

3. Navigation:
   - ScrollToTop behavior
   - Route protection
   - History management

## Contributing

1. Follow TypeScript conventions
2. Maintain component patterns
3. Use existing UI components
4. Test responsive layouts
5. Document new features

## Future Improvements

1. Dark mode support
2. Social authentication
3. Article bookmarking
4. Advanced search
5. User preferences
