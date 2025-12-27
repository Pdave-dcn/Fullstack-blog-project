# Introduction

**TextNode** is a full‑stack, monorepo‑based blog platform built as a long‑term learning and experimentation project. It explores not only _what_ modern web applications are built with, but _how_ they are structured and evolved as complexity grows.

The project consists of:

- A **backend API** written in TypeScript and progressively refactored toward **Domain‑Driven Design (DDD)** and **Clean Architecture**
- **Two frontend applications**, each serving a different audience and use case, built with modern React tooling and patterns

---

## Project Goals

TextNode was created to:

- Explore **full‑stack TypeScript** in a real, non‑trivial application
- Learn how architectural decisions change as a codebase scales
- Practice refactoring from a pragmatic, feature‑first implementation to a more **explicit and maintainable architecture**
- Serve as a **portfolio and reference project** for future work

Rather than being designed as a production SaaS, the project emphasizes _clarity_, _learning_, and _intentional trade‑offs_.

---

## Architectural Evolution

As the codebase grew, both the backend and frontends underwent significant refactors.

### Backend

The backend was refactored toward a **DDD‑inspired and Clean Architecture** approach:

- Clear separation between **domain**, **application**, **infrastructure**, and **interface** layers
- Business rules isolated from Express, Prisma, and framework concerns
- Use cases representing explicit application behavior
- Query vs command separation where appropriate
- Improved testability, readability, and long‑term maintainability

A detailed breakdown of the backend architecture and refactoring decisions is available here:

👉 **Backend Refactoring Documentation** (`docs/backend-refactoring.md`)

### Frontends

Both frontend applications were refactored to follow **modern React best practices**:

- Clear separation between UI components, server state, and local state
- Adoption of **React Query** for API data fetching and caching
- Centralized API access via **Axios** abstractions
- Shared **Zod schemas** for validation and type safety
- **Zustand** for predictable client‑side state management
- Cleaner folder structures and reusable hooks

These changes made the frontends easier to reason about, extend, and maintain while keeping UI code declarative and focused.

---

## Target Audience

This project may be useful for:

- Developers exploring **full‑stack TypeScript** projects
- Engineers interested in **DDD, Clean Architecture, and refactoring strategies**
- Students learning about **monorepos**, Prisma, or modern React tooling
- Developers comparing pragmatic vs architectural approaches in real codebases

---

> ⚠️ **Disclaimer**
> TextNode should be considered a learning project and evolving MVP. While it demonstrates real architectural patterns and working features, there are still areas that could benefit from further optimization, testing, and polish. Feedback and contributions are welcome.
