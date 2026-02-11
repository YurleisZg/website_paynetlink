# PayNetLink - Project Guidelines for Claude

## Project Overview

PayNetLink is an ISP management platform that automates day-to-day operations for Internet Service Providers. The web application handles customer management, billing, payments, technical automation (MikroTik integration), notifications, and electronic invoicing.

**Key Goals:**

- Reduce manual errors in ISP operations
- Improve service control and billing efficiency
- Provide stable, scalable infrastructure
- Follow modern architectural patterns for maintainability

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
- ✅ Use Context7
- ✅ Comments in English
- ❌ Not add in git commits to Claude or Anthropic as coauthor

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

```typescript
// ✅ DO: Use strict TypeScript settings (already configured)
// - noUncheckedIndexedAccess: true
// - strict: true
// - noUnusedLocals: true
// - noUnusedParameters: true

// ✅ DO: Use type imports
import type { User } from "@/entities/user";

// ✅ DO: Define explicit return types for functions
export function fetchUser(id: string): Promise<User> {
    // ...
}

// ✅ DO: Use interfaces for objects, type for unions/primitives
export interface User {
    id: string;
    email: string;
    name: string;
}

export type UserRole = "admin" | "operator" | "customer";

// ❌ DON"T: Use "any" - use "unknown" if type is truly unknown
```

### Vue Components

```vue
<!-- ✅ DO: Use <script setup> with TypeScript -->
<script setup lang="ts">
import { ref } from "vue";

// ✅ DO: Always define component name with defineOptions
defineOptions({
    name: "UserProfile",
});

// ✅ DO: Type props explicitly
defineProps<{
    userId: string;
    isActive?: boolean;
}>();

// ✅ DO: Type emits explicitly
const emit = defineEmits<{
    submit: [data: FormData];
    cancel: [];
}>();

// ✅ DO: Use descriptive variable names
const isLoading = ref(false);
const userProfile = ref<User | null>(null);
</script>

<template>
    <!-- ✅ DO: Use Tailwind utility classes -->
    <div class="flex flex-col gap-4 p-6">
        <!-- ✅ DO: Use semantic HTML -->
        <h1 class="text-2xl font-bold">User Profile</h1>
    </div>
</template>

<!-- ❌ DON"T: Use scoped styles with Tailwind unless absolutely necessary -->
<!-- Prefer Tailwind utilities for styling -->
```

### Formatting (Prettier)

**IMPORTANT: These settings are enforced by pre-commit hooks:**

- **No semicolons** (`semi: false`)
- **Single quotes** (`singleQuote: true`)
- **4 spaces** for indentation (`tabWidth: 4`)
- **Trailing commas** in ES5 contexts (`trailingComma: "es5"`)
- **100 character** line width (`printWidth: 100`)

```typescript
// ✅ Correct formatting
const user = {
    id: "123",
    name: "John Doe",
    email: "john@example.com",
};

// ❌ Wrong formatting (will be auto-fixed)
const user = {
    id: "123",
    name: "John Doe",
    email: "john@example.com",
};
```

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

### Import Aliases

```typescript
// ✅ DO: Use @ alias for absolute imports
import { Button } from "@/shared/ui";
import { fetchUser } from "@/entities/user";
import { login } from "@/features/auth";

// ❌ DON"T: Use relative imports across layers
import { Button } from "../../../shared/ui/Button.vue";
```

### Component Organization

```typescript
// ✅ DO: Order imports logically
// 1. Vue core
import { ref, computed, onMounted } from "vue";
// 2. Third-party libraries
import { useQuery } from "@tanstack/vue-query";
// 3. Internal shared
import { Button } from "@/shared/ui";
// 4. Internal entities/features
import { fetchUser } from "@/entities/user";
// 5. Local imports
import type { Props } from "./types";
```

---

## State Management Strategy

### Server State (TanStack Query)

**Use for:** API data, caching, background refetching

```typescript
import { useQuery, useMutation } from "@tanstack/vue-query";
import { fetchUser } from "@/entities/user";

// ✅ DO: Use TanStack Query for server state
export function useUserQuery(userId: string) {
    return useQuery({
        queryKey: ["user", userId],
        queryFn: () => fetchUser(userId),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}

// ✅ DO: Use mutations for write operations
export function useUpdateUser() {
    return useMutation({
        mutationFn: (data: UpdateUserPayload) => updateUser(data),
        onSuccess: () => {
            // Invalidate cache, show toast, etc.
        },
    });
}
```

### Client State (Composables)

**Use for:** UI state, form state, local preferences

```typescript
// ✅ DO: Create composables for shared client state
export function useAuthState() {
    const user = ref<User | null>(null);
    const isAuthenticated = computed(() => user.value !== null);

    function logout() {
        user.value = null;
        localStorage.removeItem("token");
    }

    return { user, isAuthenticated, logout };
}
```

---

## HTTP Client Configuration

The project uses a configured Axios instance at `@/shared/lib/http/client.ts`:

- **Base URL:** From `VITE_API_URL` env variable (default: `/api`)
- **Timeout:** 15 seconds
- **Auth:** Automatic Bearer token injection from localStorage/sessionStorage
- **401 Handling:** Auto-clears auth tokens on unauthorized responses

```typescript
// ✅ DO: Use the configured apiClient for all API calls
import { apiClient } from "@/shared/lib/http/client";

export async function fetchUser(id: string): Promise<User> {
    const response = await apiClient.get<UserDto>(`/users/${id}`);
    return mapUserDtoToUser(response.data);
}

// ❌ DON"T: Create new axios instances
import axios from "axios";
const response = await axios.get("/users"); // Wrong!
```

---

## Testing Strategy

### Unit Tests (Vitest + Testing Library)

**Location:** Co-located with components (`ComponentName.spec.ts`)

```typescript
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/vue";
import HomePage from "./HomePage.vue";

describe("HomePage", () => {
    it("renders welcome message", () => {
        render(HomePage);
        expect(screen.getByText(/Welcome to PayNetLink/i)).toBeDefined();
    });
});
```

**Commands:**

- `pnpm run test` - Watch mode
- `pnpm run test:run` - Run once (CI)
- `pnpm run test:ui` - Vitest UI

### E2E Tests (Playwright)

**Location:** `e2e/` directory

```typescript
import { test, expect } from "@playwright/test";

test.describe("Home", () => {
    test("should display the home page with the title", async ({ page }) => {
        await page.goto("/");
        await expect(page.getByRole("heading", { name: /Welcome to PayNetLink/i })).toBeVisible();
    });
});
```

**Commands:**

- `pnpm run test:e2e` - Run E2E tests
- `pnpm run test:e2e:ui` - Playwright UI mode
- `pnpm run test:e2e:headed` - Run with browser visible

**Configuration:**

- Tests run against `http://localhost:5173`
- Dev server auto-starts if not running
- Tests across Chromium, Firefox, and WebKit
- CI mode: 2 retries, sequential execution

### Storybook

**Location:** `*.stories.ts` files co-located with components

```typescript
import type { Meta, StoryObj } from "@storybook/vue3";
import Button from "./Button.vue";

const meta: Meta<typeof Button> = {
    title: "Shared/Button",
    component: Button,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        variant: "primary",
    },
};
```

**Commands:**

- `pnpm run storybook` - Start at `http://localhost:6006`
- `pnpm run build-storybook` - Build static site

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

**Location:** `src/app/router/index.ts`

```typescript
// ✅ DO: Use lazy loading for route components
{
    path: "/dashboard",
    name: "dashboard",
    component: () => import("@/pages/dashboard/DashboardPage.vue"),
    meta: { layout: "default", requiresAuth: true }
}

// ✅ DO: Add route meta for layouts and auth
meta: {
    layout: "default",      // Layout to use
    requiresAuth: true,     // Requires authentication
    title: "Dashboard"      // Page title
}
```

---

## Environment Variables

**File:** `.env` or `.env.local` (not committed)

```env
VITE_API_URL=https://api.paynetlink.com
```

**Access in code:**

```typescript
// ✅ DO: Use shared config
import { config } from "@/shared/config";
console.log(config.apiUrl); // From VITE_API_URL
console.log(config.isDev); // From import.meta.env.DEV
```

---

## Common Patterns

### Creating a New Feature

1. **Create feature directory:**

    ```
    src/features/payment/
    ├── index.ts
    ├── model/
    │   ├── types.ts
    │   └── paymentState.ts
    ├── api/
    │   └── paymentApi.ts
    └── ui/
        └── PaymentForm.vue
    ```

2. **Define types** (`model/types.ts`):

    ```typescript
    export interface Payment {
        id: string;
        amount: number;
        status: "pending" | "completed" | "failed";
    }
    ```

3. **Create API functions** (`api/paymentApi.ts`):

    ```typescript
    import { apiClient } from "@/shared/lib/http/client";

    export async function createPayment(data: CreatePaymentPayload): Promise<Payment> {
        const response = await apiClient.post("/payments", data);
        return response.data;
    }
    ```

4. **Build UI component** (`ui/PaymentForm.vue`):

    ```vue
    <script setup lang="ts">
    import { useMutation } from "@tanstack/vue-query";
    import { createPayment } from "../api/paymentApi";

    defineOptions({ name: "PaymentForm" });

    const { mutate, isPending } = useMutation({
        mutationFn: createPayment,
    });
    </script>
    ```

5. **Export public API** (`index.ts`):
    ```typescript
    export type { Payment } from "./model/types";
    export { createPayment } from "./api/paymentApi";
    export { default as PaymentForm } from "./ui/PaymentForm.vue";
    ```

### Creating a New Page

```typescript
// src/pages/payment/PaymentPage.vue
<script setup lang="ts">
import { PaymentForm } from "@/features/payment"

defineOptions({ name: "PaymentPage" })
</script>

<template>
    <div class="container mx-auto p-6">
        <h1 class="text-3xl font-bold mb-6">Payment</h1>
        <PaymentForm />
    </div>
</template>
```

```typescript
// Add route to src/app/router/index.ts
{
    path: "/payment",
    name: "payment",
    component: () => import("@/pages/payment/PaymentPage.vue"),
    meta: { layout: "default", requiresAuth: true }
}
```

### Creating a Shared Component

```vue
<!-- src/shared/ui/Card.vue -->
<script setup lang="ts">
defineOptions({ name: "Card" })

defineProps<{
    title?: string
    variant?: "default" | "elevated"
}>()
</script>

<template>
    <div
        class="rounded-lg border p-4"
        :class="variant === "elevated" ? "shadow-lg" : "shadow""
    >
        <h3 v-if="title" class="text-lg font-semibold mb-2">{{ title }}</h3>
        <slot />
    </div>
</template>
```

```typescript
// src/shared/ui/index.ts
export { default as Button } from "./Button.vue";
export { default as Card } from "./Card.vue";
export { default as HelloWorld } from "./HelloWorld.vue";
```

### Creating a Composable

```typescript
// src/shared/composables/useDebounce.ts
import { ref, watch } from "vue";

export function useDebounce<T>(value: Ref<T>, delay: number = 300): Ref<T> {
    const debouncedValue = ref<T>(value.value) as Ref<T>;
    let timeout: NodeJS.Timeout;

    watch(value, (newValue) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            debouncedValue.value = newValue;
        }, delay);
    });

    return debouncedValue;
}
```

---

## Do"s and Don"ts

### ✅ DO

- **Follow layer rules strictly** - Never import upward in the dependency chain
- **Use TypeScript strictly** - Leverage type safety, avoid `any`
- **Use TanStack Query** for server state - Built-in caching and loading states
- **Co-locate tests** with components - Keep tests close to implementation
- **Use Tailwind utilities** - Avoid custom CSS unless necessary
- **Write semantic HTML** - Accessibility matters
- **Use `<script setup>`** - Modern Vue 3 syntax
- **Define component names** with `defineOptions({ name: "ComponentName" })`
- **Export through index.ts** - Public API pattern
- **Use conventional commits** - Enables automated versioning
- **Run tests before committing** - Pre-commit hooks enforce this
- **Use path alias `@/`** - For absolute imports
- **Type props and emits** - Explicit TypeScript types

### ❌ DON"T

- **Don"t violate layer dependencies** - Features can"t import from pages
- **Don"t use `any` type** - Use `unknown` if type is truly unknown
- **Don"t create new axios instances** - Use the configured `apiClient`
- **Don"t commit without linting** - Pre-commit hooks will catch this
- **Don"t use relative imports across layers** - Use `@/` alias
- **Don"t put business logic in pages** - Pages compose, features implement
- **Don"t share state between features** - Use entities for shared domain logic
- **Don"t skip tests** - Maintain coverage
- **Don"t use component names without defineOptions** - Helps debugging
- **Don"t use inline styles** - Prefer Tailwind utilities
- **Don"t ignore TypeScript errors** - Fix them, don"t suppress
- **Don"t push directly to main** - Use feature branches

---

## Current Project Status

**Branch:** `chore/config-project`

**Status:** Major architectural restructuring in progress

**Completed:**

- ✅ Feature-Sliced Design structure implemented
- ✅ Tailwind CSS v4 configured
- ✅ TypeScript strict mode enabled
- ✅ TanStack Query integrated
- ✅ Testing infrastructure (Vitest + Playwright + Storybook)
- ✅ Pre-commit hooks configured
- ✅ ESLint + Prettier setup
- ✅ Basic components created (Button, AppNav, LoginForm, UserAvatar)
- ✅ Basic pages created (Home, About)
- ✅ HTTP client with interceptors

**In Progress:**

- 🔄 Many staged/untracked files not yet committed
- 🔄 Old Vue structure files deleted (App.vue, router/index.js, etc.)

**Next Steps:**

- Add more business features (payments, plans, customers)
- Implement authentication flow
- Add API integration
- Create more reusable components
- Expand test coverage

---

## Additional Resources

- **Vue 3 Docs:** https://vuejs.org/
- **TypeScript:** https://www.typescriptlang.org/
- **Tailwind CSS v4:** https://tailwindcss.com/
- **TanStack Query:** https://tanstack.com/query/latest/docs/vue/overview
- **Vitest:** https://vitest.dev/
- **Playwright:** https://playwright.dev/
- **Feature-Sliced Design:** https://feature-sliced.design/
- **Conventional Commits:** https://www.conventionalcommits.org/

---

## Questions or Issues?

When working on this project, always:

1. Check layer dependencies before importing
2. Run linters and tests before committing
3. Follow naming conventions
4. Use TypeScript strictly
5. Write tests for new features
6. Use conventional commits

If you encounter issues:

- Run `pnpm run typecheck` to check types
- Run `pnpm run lint:fix` to fix linting
- Run `pnpm run format` to fix formatting
- Check `.env` file for environment variables
- Verify you"re using Node.js version specified in `.nvmrc`
