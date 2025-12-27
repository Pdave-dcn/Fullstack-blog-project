# Backend Refactoring Overview (DDD)

## Context

This project is a **fullstack application** composed of:

- A **Node.js / Express backend**
- Two separate **frontend applications**

This document focuses **exclusively on the backend refactoring**. Both frontends were also refactored, but they are documented separately.

The backend was refactored incrementally to adopt **Domain-Driven Design (DDD)** principles combined with **Clean Architecture**. The goal was not academic purity, but to improve **maintainability, testability, and long-term scalability** as the system grew in complexity.

---

## Why the Refactor Was Needed

Before the refactor, the backend followed a more traditional layered / MVC-style structure:

- Controllers contained business rules
- Authorization checks were scattered
- Infrastructure concerns leaked into application logic
- Read models and write models were mixed

As features like **articles, comments, replies, dashboards, moderation, and rate limiting** were added, this structure became harder to evolve safely.

The refactor aimed to:

- Isolate **business rules** from frameworks
- Make **use cases explicit**
- Centralize **authorization and cross-cutting concerns**
- Prepare the system for **growth without rewrites**

---

## Architectural Overview

The backend now follows a layered architecture inspired by DDD:

```bash
backend/
├── domains/          # Core business logic (Entities, Value Objects, Rules)
├── application/      # Use cases (commands & queries)
├── interfaces/       # HTTP controllers, DTOs, middleware
├── infrastructure/   # DB, auth, logging, rate limits, DI
```

### Dependency Rule

Dependencies always point **inward**:

```bash
Interfaces → Application → Domain
Infrastructure → Application → Domain
```

The **Domain layer has no dependency** on Express, databases, Passport, or external libraries.

---

## Domain Layer

The domain represents the **business language of the system**.

Examples:

- `Article`
- `Comment`
- `User`
- `UserRole`

Entities encapsulate rules and invariants, not HTTP or persistence concerns.

```ts
class Article {
  constructor(
    public readonly id: string,
    public title: string,
    public content: string,
    public status: ArticleStatus,
    public readonly authorId: string,
    public readonly createdAt: Date
  ) {}
}
```

No serialization logic, no database logic, no framework imports.

---

## Application Layer (Use Cases)

Each business action is represented as a **use case**.

Examples:

- `CreateArticleUseCase`
- `DeleteCommentUseCase`
- `ListCommentRepliesUseCase`
- `GetDashboardStatsUseCase`

### Commands vs Queries

- **Commands**: mutate state (create, update, delete)
- **Queries**: return read models optimized for the UI

This allowed the introduction of **read-specific views**, such as:

- Articles with `commentsCount`
- Dashboard aggregates

without polluting domain entities.

---

## Interfaces Layer

This layer adapts the outside world to the application.

It contains:

- Express controllers
- HTTP middlewares
- Request validation
- DTO mapping

Controllers are intentionally thin:

- Parse input
- Call a use case
- Return a response

Authorization checks (e.g. roles) are handled via middleware, not inside controllers or use cases.

---

## Infrastructure Layer

Infrastructure contains all technical details:

- Database repositories
- Passport JWT authentication
- Rate limiting
- Logging (Pino)
- Dependency Injection setup

### Rate Limiting

Rate limiting is treated as an **infrastructure concern**, implemented via Express middleware and custom errors (e.g. `RateLimitError`).

### Authentication & Authorization

- `authenticateJwt` middleware handles identity
- `requireRole` middleware handles authorization

This keeps both **controllers and use cases free of HTTP-specific logic**.

---

## Logging Strategy

The system uses **structured logging** via `pino-http`.

Logs are added at strategic points:

- Middleware boundaries (auth, role checks)
- Controller entry / exit
- Use case execution start / completion

This provides clear request flow visibility without polluting domain logic.

---

## Tradeoffs & Intentional Choices

This refactor intentionally avoids:

- Anemic domain models
- God controllers
- Framework-driven design

At the same time, it avoids over-engineering:

- No event sourcing
- No message bus
- No premature microservices

DDD concepts are applied **selectively**, where they provide clear value.

---

## Summary

This refactor positions the backend for:

- Easier feature development
- Safer refactoring
- Clear separation of concerns
- Better long-term maintainability

The frontends were refactored independently and are documented separately.

For a high-level overview, refer to the main `README.md`.
