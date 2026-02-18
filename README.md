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
- **vue-i18n** – Internationalization (i18n)
- **TanStack Query (Vue Query)** – Server state and caching
- **Axios** – HTTP client (with interceptors)
- **Vitest** – Unit tests
- **Playwright** – E2E tests
- **Storybook** – Component development and documentation
- **ESLint + Prettier** – Linting and formatting
- **eslint-plugin-boundaries** – Enforces FSD layer dependency rules
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

### Dependency rules

These rules are **enforced at lint time** by [`eslint-plugin-boundaries`](https://github.com/javierbrea/eslint-plugin-boundaries). Any import that violates them will produce an ESLint error.

- **Shared** does not import from entities, features, pages, or widgets.
- **Entities** do not import from features or pages.
- **Features** do not import from pages or other features (cross-feature code goes in entities or shared).
- **Widgets** do not import from pages.
- **Pages** only compose features and widgets; complex logic lives in features or entities.

Run `pnpm run lint` to verify all imports respect the layer boundaries.

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
│   ├── i18n/               # Internationalization setup and locales
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

## Internationalization (i18n)

The project uses **vue-i18n** with per-feature locale files, fallback support, and development warnings.

### How it works

- Default locale: `es` (Spanish)
- Fallback locale: `es` — if a key is missing in another language, Spanish is shown
- `missingWarn` and `fallbackWarn` are enabled only in development

### Locale file structure

Translations are organized by feature inside each locale folder:

```
src/shared/i18n/locales/
├── es/
│   ├── common.json       # Shared keys (buttons, errors, etc.)
│   ├── auth.json          # Auth feature translations
│   └── billing.json       # Billing feature translations
└── en/
    ├── common.json
    ├── auth.json
    └── billing.json
```

Files are loaded automatically via `import.meta.glob` — no manual registration needed.

### Adding translations for a new feature

1. Create a JSON file in the locale folder:

```json
// src/shared/i18n/locales/es/customers.json
{
    "customers": {
        "title": "Clientes",
        "addButton": "Agregar cliente",
        "deleteConfirm": "¿Estás seguro de eliminar este cliente?"
    }
}
```

2. Optionally add the English version:

```json
// src/shared/i18n/locales/en/customers.json
{
    "customers": {
        "title": "Customers",
        "addButton": "Add customer",
        "deleteConfirm": "Are you sure you want to delete this customer?"
    }
}
```

That's it. The new file is detected automatically on the next build/reload.

### Using translations in components

With Composition API:

```vue
<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<template>
    <h1>{{ t("customers.title") }}</h1>
    <button>{{ t("customers.addButton") }}</button>
</template>
```

Or with the global `$t` injection (no import needed):

```vue
<template>
    <h1>{{ $t("customers.title") }}</h1>
    <button>{{ $t("common.save") }}</button>
</template>
```

### Switching locale at runtime

```ts
import { loadAndSetLocale } from "@/shared/i18n";

await loadAndSetLocale("en");
```

### Key naming convention

Keys follow the pattern `feature.component.key`:

```
auth.loginForm.submitButton
billing.invoiceTable.totalLabel
common.save
errors.NETWORK_ERROR
```

## Environment

Optional `.env` / `.env.local`:

```env
VITE_API_URL=https://your-api.com
```

## Conventions

- **Conventional Commits** (`feat:`, `fix:`, `BREAKING CHANGE:`) for `pnpm run release` and CHANGELOG.
- Pre-commit runs lint-staged (ESLint, Prettier) and unit tests; fix any failures before committing.
