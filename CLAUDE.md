# PayNetLink - Project Guidelines for Claude

## Project Overview

PayNetLink is an ISP management platform that automates day-to-day operations for Internet Service Providers. The web application handles customer management, billing, payments, technical automation (MikroTik integration), notifications, and electronic invoicing.

**Key Goals:**

- Reduce manual errors in ISP operations
- Improve service control and billing efficiency
- Provide stable, scalable infrastructure
- Follow modern architectural patterns for maintainability

---

## CRITICAL RULES (MANDATORY - DO NOT SKIP)

- **NEVER add Co-Authored-By, Claude, or Anthropic references in git commit messages.** This includes any variation like `Co-Authored-By: Claude ...` or `Co-Authored-By: ... <noreply@anthropic.com>`. Commit messages must only contain the conventional commit message itself.
- **ALWAYS use semantic/conventional commits** (e.g., `feat(auth): add login form`, `fix(user): resolve avatar bug`).
- **ALWAYS use Context7 for documentation lookups.**
- **ALWAYS follow Feature-Sliced Design (FSD) architecture and its dependency rules strictly.** Lower layers CANNOT import from upper layers. Features CANNOT import from other features. Shared CANNOT import from any other layer. Violating these rules is never acceptable.

---

## Agent & Skill Orchestration

| Request Type               | Primary Agent                            |
| -------------------------- | ---------------------------------------- |
| Vue components/composables | `vue-expert`                             |
| Complex TypeScript         | `typescript-pro`                         |
| UI/UX design, styling      | `frontend-design` + `tailwind-patterns`  |
| New feature                | `vue-expert` + `test-driven-development` |
| Bug fix                    | `test-driven-development` + `vue-expert` |
| Code review / PR           | `code-reviewer`                          |
| Refactoring                | `refactoring-specialist`                 |
| Testing strategy           | `qa-expert`                              |
| Scaffolding / bundle       | `senior-frontend`                        |
| API documentation          | `api-documenter`                         |

**Always apply:**

- `test-driven-development` — MANDATORY for all features and bugfixes
- `code-reviewer` — after >5 files changed or before creating a PR
- `tailwind-patterns` — any component that involves styling
- `typescript-pro` — when `any` appears or complex generics needed

---

## Architecture: Feature-First + Layers

This project uses **Feature-Sliced Design (FSD)**, a methodology that organizes code by features and layers to improve maintainability, scalability, and team collaboration.

### Layer Structure (Top → Bottom)

```
src/
├── app/          # Application bootstrap layer
├── pages/        # Route-level screens
├── widgets/      # Large reusable UI blocks
├── features/     # User-facing use cases
├── entities/     # Business domain objects
└── shared/       # Domain-agnostic utilities
```

### Layer Dependency Rules

**CRITICAL: These rules MUST be followed strictly:**

| Layer        | Purpose                                                | Can Import From                            |
| ------------ | ------------------------------------------------------ | ------------------------------------------ |
| **app**      | Bootstrap: entry point, router, providers, root layout | shared, entities, features, pages, widgets |
| **pages**    | Route-level screens that compose features/widgets      | shared, entities, features, widgets        |
| **widgets**  | Large reusable UI blocks (nav, sidebars, dashboards)   | shared, entities, features                 |
| **features** | User-facing use cases (login, checkout)                | shared, entities                           |
| **entities** | Core business objects (User, Plan, Payment)            | shared                                     |
| **shared**   | Domain-agnostic code (UI primitives, utils, config)    | (nothing - completely independent)         |

**Rules:**

- ✅ Lower layers can be used by upper layers
- ❌ Upper layers CANNOT be imported by lower layers
- ❌ Features CANNOT import from other features (use entities or shared for cross-feature code)
- ❌ Shared CANNOT import from any other layer
- ✅ Use public API via `index.ts` for each slice
- ✅ Use Context7 (MANDATORY)
- ✅ Comments in English
- ❌ Not add in git commits to Claude or Anthropic as coauthor (MANDATORY)

### Feature/Entity Internal Structure

Each feature or entity follows this pattern:

```
feature-name/
├── index.ts          # Public API (exports only what"s needed externally)
├── model/            # State, types, business logic
│   ├── types.ts
│   └── state.ts
├── api/              # API calls, data fetching
│   └── featureApi.ts
└── ui/               # UI components
    └── FeatureComponent.vue
```

**Example:** `src/entities/user/`

- `index.ts` exports: `User`, `UserDto`, `fetchUserById`, `UserAvatar`
- `model/types.ts`: TypeScript interfaces
- `api/userApi.ts`: API functions
- `ui/UserAvatar.vue`: Reusable component

---

## Tech Stack

- **Framework:** Vue 3.5+ (Composition API, `<script setup>`)
- **Language:** TypeScript 5.9+ (strict mode enabled)
- **Build Tool:** Vite 7+
- **Routing:** Vue Router 4.6+
- **Styling:** Tailwind CSS v4.1+
- **State Management:** TanStack Query (Vue Query) 5.62+
- **HTTP Client:** Axios 1.13+
- **Unit Testing:** Vitest 2.1+ with Testing Library
- **E2E Testing:** Playwright 1.58+
- **Component Docs:** Storybook 8.6+
- **Linting:** ESLint 9+ with Vue plugin
- **Formatting:** Prettier 3.4+
- **Git Hooks:** Husky 9+ with lint-staged
- **Versioning:** standard-version 9.5+
- **Package Manager:** pnpm 9.15+

---

## Code Style & Conventions

### TypeScript

- Use `import type` for type-only imports
- Use `interface` for objects, `type` for unions/primitives
- Define explicit return types for exported functions
- Never use `any` — use `unknown` if type is truly unknown
- Strict mode is enabled (`strict`, `noUncheckedIndexedAccess`, `noUnusedLocals`, `noUnusedParameters`)

### Vue Components

- Always use `<script setup lang="ts">`
- Always define component name with `defineOptions({ name: "ComponentName" })`
- Type props and emits explicitly with generics (`defineProps<{...}>()`, `defineEmits<{...}>()`)
- Use Tailwind utilities instead of scoped styles
- Use semantic HTML

### Formatting (Prettier)

**Enforced by pre-commit hooks:** No semicolons, single quotes, 4-space indent, trailing commas (ES5), 100 char line width.

### Naming Conventions

| Type                 | Convention                  | Example                                   |
| -------------------- | --------------------------- | ----------------------------------------- |
| **Components**       | PascalCase                  | `UserProfile.vue`, `LoginForm.vue`        |
| **Composables**      | camelCase with `use` prefix | `useDebounce.ts`, `useAuth.ts`            |
| **Types/Interfaces** | PascalCase                  | `User`, `LoginPayload`                    |
| **Constants**        | UPPER_SNAKE_CASE            | `API_TIMEOUT`, `MAX_RETRIES`              |
| **Functions**        | camelCase                   | `fetchUser()`, `validateEmail()`          |
| **Files**            | Match export name           | `userApi.ts` (exports user API functions) |
| **Folders**          | kebab-case or camelCase     | `auth/`, `userProfile/`                   |

### Imports

- Use `@/` alias for all cross-layer imports — never relative paths across layers
- Order: Vue core → third-party → `@/shared` → `@/entities`/`@/features` → local

---

## State Management Strategy

- **Server state:** TanStack Query (`useQuery`/`useMutation`) for all API data, caching, and background refetching
- **Client state:** Vue composables (`ref`, `computed`) for UI state, form state, and local preferences

---

## HTTP Client

Always use the configured `apiClient` from `@/shared/lib/http/client.ts` — never create new Axios instances. It handles base URL (`VITE_API_URL`), 15s timeout, Bearer token injection, and 401 auto-logout.

---

## Error Handling

- Use a global error boundary at `app/` level to catch unexpected errors
- **Centralize API error handling** in `QueryClient` default `onError` — never repeat error-to-message mapping in each feature
- Backend errors must include a `code` field. Map codes to i18n keys globally: `toast.error(t(\`errors.\${code}\`))`
- Distinguish: **expected errors** (4xx with `code`) → show mapped i18n message; **unexpected errors** (5xx, network) → log + show generic message
- 401/403 are handled centrally by the `apiClient` interceptor
- Only add `onError` in a feature when you need **additional logic** beyond the toast (redirect, clear form, etc.) — not to map messages
- Never silently swallow errors — always log or notify

---

## Cross-Feature Communication

Features CANNOT import from other features. When features need to communicate:

- **Shared data:** Extract to an entity (e.g., if `auth` and `billing` both need `User`, it lives in `entities/user/`)
- **Events:** Use a typed event bus in `shared/lib/` or `provide/inject` from a parent widget/page
- **Coordinated actions:** Pages and widgets orchestrate multiple features — that's their purpose

---

## i18n Strategy

- All user-facing text MUST go through `vue-i18n` — no hardcoded strings in templates or components
- Translation keys follow namespace pattern: `feature.component.key` (e.g., `auth.loginForm.submitButton`)
- Keep translation files per locale in `shared/i18n/locales/`

---

## API Types Strategy

- **Persistence types** (API shape) live in the slice's `api/` folder
- **Domain models** (what the app uses) live in the slice's `model/types.ts`
- Use a **class-based Mapper pattern** with a base `Mapper<Domain, Persistence>` abstract class in `shared/lib/mapper.ts`
- Every entity/feature mapper must extend `Mapper` and implement `toDomain(raw)` and `toPersistence(domain)`
- Components consume Domain models directly — no separate DTO layer needed
- Mappers can compose other mappers (e.g., `CustomerMapper` calls `PlanMapper.toDomain()` for nested objects)
- Never use `any` in mapper signatures — always type `Domain` and `Persistence` explicitly
- Never use API responses directly in components — always go through the mapper
- If the backend provides an OpenAPI spec, prefer auto-generating Persistence types from it

---

## Testing Strategy

- **Unit tests (Vitest + Testing Library):** Co-located with components as `ComponentName.spec.ts`
- **E2E tests (Playwright):** In `e2e/` directory. Runs against `http://localhost:5173` on Chromium, Firefox, WebKit
- **Storybook:** Co-located `*.stories.ts` files for component documentation
- **Test behavior, not implementation.** Never assert CSS classes, DOM structure, or visual appearance. Test what the user can do: clicks, form submissions, visible text, navigation. If a test would break from a refactor that doesn't change behavior, it's a bad test.
- **Prefer integration tests over unit tests.** Test components with their real children and composables together. Only isolate with unit tests when testing pure logic (utils, helpers). Integration tests give more confidence with fewer tests.

---

## Git Workflow

### Commit Convention

**CRITICAL: Use Conventional Commits for `standard-version` automation**

Format: `<type>(<scope>): <subject>`

**Types:**

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation only
- `style:` - Code style (formatting, no logic change)
- `refactor:` - Code refactoring
- `test:` - Add/update tests
- `chore:` - Build process, dependencies, tooling
- `perf:` - Performance improvement
- `ci:` - CI/CD changes

**Examples:**

```bash
feat(auth): add login form with email validation
fix(user): resolve avatar loading issue on slow connections
docs: update README with new deployment instructions
refactor(shared): extract button variants to separate file
test(home): add E2E test for navigation links
chore(deps): upgrade vue-router to 4.6.4
```

### Pre-commit Hooks

**Automatically runs on commit:**

1. ESLint with auto-fix on `*.{js,ts,vue}`
2. Prettier formatting on all files
3. TypeScript type checking
4. Unit tests

**If hooks fail:**

- Fix linting errors: `pnpm run lint:fix`
- Fix formatting: `pnpm run format`
- Fix tests: `pnpm run test:run`
- Check types: `pnpm run typecheck`

### Branching Strategy

- `main` - Production branch
- `chore/config-project` - Current: Project restructuring
- Feature branches: `feat/feature-name`
- Bug fixes: `fix/bug-description`
- Refactoring: `refactor/what-changed`

### Versioning

```bash
# Patch version (0.0.x) - bug fixes
pnpm run release

# Minor version (0.x.0) - new features
pnpm run release:minor

# Major version (x.0.0) - breaking changes
pnpm run release:major
```

Auto-generates `CHANGELOG.md` from commit messages.

---

## Development Commands

| Command                 | Description                                 |
| ----------------------- | ------------------------------------------- |
| `pnpm install`          | Install dependencies                        |
| `pnpm run dev`          | Start dev server at `http://localhost:5173` |
| `pnpm run build`        | Production build                            |
| `pnpm run preview`      | Preview production build                    |
| `pnpm run typecheck`    | TypeScript type checking                    |
| `pnpm run test`         | Run unit tests (watch mode)                 |
| `pnpm run test:run`     | Run unit tests once                         |
| `pnpm run test:ui`      | Vitest UI                                   |
| `pnpm run test:e2e`     | Run E2E tests                               |
| `pnpm run test:e2e:ui`  | Playwright UI                               |
| `pnpm run lint`         | Run ESLint                                  |
| `pnpm run lint:fix`     | ESLint with auto-fix                        |
| `pnpm run format`       | Format with Prettier                        |
| `pnpm run format:check` | Check formatting                            |
| `pnpm run storybook`    | Start Storybook                             |
| `pnpm run release`      | Version bump + CHANGELOG                    |

---

## Router Configuration

**Location:** `src/app/router/index.ts`. Use lazy loading (`() => import(...)`) for all route components. Route meta supports `layout`, `requiresAuth`, and `title`.

---

## Environment Variables

Use `@/shared/config` to access env vars (`config.apiUrl`, `config.isDev`). Never read `import.meta.env` directly outside shared config.

---

## Common Patterns

When creating new slices (features, entities, pages, etc.), follow the internal structure defined in **Feature/Entity Internal Structure** above. Key reminders:

- **New feature/entity:** Create `index.ts` (public API), `model/` (types, state), `api/` (API calls), `ui/` (components). Export only what's needed via `index.ts`.
- **New page:** Compose features/widgets, add lazy-loaded route in `src/app/router/index.ts`.
- **New shared component:** Add to `src/shared/ui/`, export from `src/shared/ui/index.ts`.
- **New composable:** Add to `src/shared/composables/` with `use` prefix.

---

## Additional Rules

- Pages only compose features/widgets — never put business logic in pages
- Features CANNOT share state with other features — use entities or shared for cross-feature data
- Never push directly to `main` — use feature branches
- Every new UI component MUST include its corresponding `*.stories.ts` file
