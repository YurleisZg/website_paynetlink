import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import("@/pages/home/HomePage.vue"),
            meta: { layout: "default" },
        },
        {
            path: "/about",
            name: "about",
            component: () => import("@/pages/about/AboutPage.vue"),
            meta: { layout: "default" },
        },
        {
            path: "/login",
            name: "login",
            component: () => import("@/pages/auth/login/LoginPage.vue"),
            meta: { layout: "auth", title: "Iniciar sesión", requiresAuth: false },
        },
    ],
});

export { router };
