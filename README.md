# PayNetLink Website

Web project built with Vue 3, TypeScript, and a **Feature-first + layers** architecture.

## About PayNetLink

PayNetLink aims to simplify and automate the day-to-day operation of an ISP, reducing manual errors and improving service control so that the operator can bill more effectively, respond faster, and run with greater stability.

### What it does

- **Customer and plan management** — Registration, service states, history, and administrative control.
- **Payments and collections** — Payment recording and support for multiple gateways, plus automation of billing-related processes.
- **Technical automation** — Integration with network equipment (e.g. MikroTik) to activate, suspend, or manage service more efficiently.
- **Notifications and communication** — Automatic messages to customers (reminders, status updates, confirmations).
- **Electronic invoicing** — Support for invoicing processes.

## Tech stack

- **Vue 3** – Progressive JavaScript framework (Composition API, `<script setup>`)
- **TypeScript** – Typed JavaScript
- **Vite** – Build tool and dev server
- **Vue Router** – Official router for Vue
- **Tailwind CSS** – Utility-first CSS
- **TanStack Query (Vue Query)** – Server state and caching
- **Axios** – HTTP client (with interceptors)
- **Vitest** – Unit tests
- **Playwright** – E2E tests
- **Storybook** – Component development and documentation
- **ESLint + Prettier** – Linting and formatting
- **Husky + lint-staged** – Pre-commit hooks (lint, format, tests)
- **standard-version** – Changelog and release versioning

## Installation

The project uses **pnpm**. Install dependencies:

```bash
corepack enable
pnpm install
```

If you use **npm** you may need:

```bash
npm install --legacy-peer-deps
```

## Scripts

| Command                | Description                                                |
| ---------------------- | ---------------------------------------------------------- |
| `pnpm run dev`         | Start dev server at `http://localhost:5173`                |
| `pnpm run build`       | Production build                                           |
| `pnpm run preview`     | Preview production build                                   |
| `pnpm run typecheck`   | TypeScript check                                           |
| `pnpm run test`        | Run unit tests (watch)                                     |
| `pnpm run test:run`    | Run unit tests once                                        |
| `pnpm run test:e2e`    | Run E2E tests (Playwright)                                 |
| `pnpm run test:e2e:ui` | Playwright UI mode                                         |
| `pnpm run lint`        | Run ESLint                                                 |
| `pnpm run lint:fix`    | ESLint with auto-fix                                       |
| `pnpm run format`      | Format with Prettier                                       |
| `pnpm run storybook`   | Start Storybook at `http://localhost:6006`                 |
| `pnpm run release`     | Bump version and generate CHANGELOG (Conventional Commits) |

## Feature-first + layers architecture

The codebase is organized by **features** and **layers** so that:

- **Feature-first** — Code is grouped by product capability (e.g. `auth`, `user`) instead of only by technical role (e.g. “all components” or “all APIs”). Each feature can contain its own model, API calls, and UI.
- **Layers** — Different folders represent different levels of the app. Upper layers can depend on lower ones; lower layers stay independent of specific features or pages.

### Layers (top to bottom)

| Layer        | Purpose                                                                              | Can use                                    |
| ------------ | ------------------------------------------------------------------------------------ | ------------------------------------------ |
| **app**      | Bootstrap: entry point, router, providers, root layout. Wires the app together.      | shared, entities, features, pages, widgets |
| **pages**    | Route-level screens. Compose one or more features/widgets into a page.               | shared, entities, features, widgets        |
| **widgets**  | Large reusable UI blocks (nav, sidebars, dashboards) used across pages.              | shared, entities, features                 |
| **features** | User-facing use cases (e.g. login, checkout). Each has model, api, ui.               | shared, entities                           |
| **entities** | Core business objects (e.g. User, Plan). Reusable across features. model + api + ui. | shared                                     |
| **shared**   | Domain-agnostic code: UI primitives, HTTP client, composables, config, types.        | —                                          |

### Rules

- **Shared** does not import from entities, features, pages, or widgets.
- **Entities** do not import from features or pages.
- **Features** do not import from pages or other features (cross-feature via entities or shared).
- **Pages** only compose features and widgets; complex logic lives in features or entities.

This keeps the codebase easy to navigate, test, and change: you can work on a feature or entity in one place without pulling in the rest of the app.

## Project structure

```
src/
├── app/                    # App bootstrap
│   ├── main.ts             # Entry point
│   ├── App.vue             # Root (layout + router-view)
│   ├── router/             # Global routes
│   ├── providers/          # Plugins (Vue Query, etc.)
│   └── layouts/            # Base layouts
├── shared/                 # Reusable, domain-agnostic
│   ├── ui/                 # Atomic UI (Button, HelloWorld)
│   ├── lib/                # HTTP client, pure helpers
│   ├── composables/        # Generic hooks (useDebounce)
│   ├── types/              # Global types
│   └── config/             # Env and constants
├── entities/               # Business entities
│   └── user/               # model, api, ui
├── features/               # User-facing use cases
│   └── auth/               # model, api, ui
├── pages/                  # Route-level pages
│   ├── home/
│   └── about/
├── widgets/                # Large reusable blocks (AppNav)
├── styles/                 # Global styles, Tailwind
├── assets/
└── tests/                  # Test setup
```

## Routes

- `/` – Home

## Environment

Optional `.env` / `.env.local`:

```env
VITE_API_URL=https://your-api.com
```

## Conventions

- **Conventional Commits** (`feat:`, `fix:`, `BREAKING CHANGE:`) for `pnpm run release` and CHANGELOG.
- Pre-commit runs lint-staged (ESLint, Prettier) and unit tests; fix any failures before committing.
