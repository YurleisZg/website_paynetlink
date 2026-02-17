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
        {
            path: "/register",
            name: "register",
            component: () => import("@/pages/auth/register/RegisterPage.vue"),
            meta: { layout: "auth", title: "Registrarse", requiresAuth: false },
        },
        {
            path: "/forgot-password",
            name: "forgot-password",
            component: () => import("@/pages/auth/forgot-password/ForgotPasswordPage.vue"),
            meta: { layout: "auth", title: "Restablecer contraseña", requiresAuth: false },
        },
        {
            path: "/demo",
            name: "demo",
            component: () => import("@/pages/demo/DemoPage.vue"),
            meta: { title: "Demo interactiva" },
        },
    ],
});

export { router };
