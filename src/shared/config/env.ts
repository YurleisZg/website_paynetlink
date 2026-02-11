export const env = {
    apiUrl: import.meta.env.VITE_API_URL ?? "/api",
    isDev: import.meta.env.DEV,
    baseUrl: import.meta.env.BASE_URL,
} as const;
