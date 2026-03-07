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
            path: "/demo",
            name: "demo",
            component: () => import("@/pages/demo/DemoPage.vue"),
            meta: { layout: "default", title: "Demo" },
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
            path: "/contact-sales",
            name: "contact-sales",
            component: () => import("@/pages/contact-sales/ContactSalesPage.vue"),
            meta: { title: "Contactar ventas" },
        },
        {
            path: "/contact-advisor",
            name: "contact-advisor",
            component: () => import("@/pages/contact-advisor/ContactAdvisorPage.vue"),
            meta: { title: "Contactar asesor" },
        },
        {
            path: "/contact",
            name: "contact",
            component: () => import("@/pages/contact/ContactPage.vue"),
            meta: { layout: "default", title: "Contact" },
        },
        {
            path: "/privacy",
            name: "privacy",
            component: () => import("@/pages/privacy/PrivacyPage.vue"),
            meta: { layout: "default", title: "Privacy Policy" },
        },
        {
            path: "/success-stories",
            name: "success-stories",
            component: () => import("@/pages/success-stories/SuccessStoriesPage.vue"),
            meta: { layout: "default", title: "Success Stories" },
        },
        {
            path: "/customer-management",
            name: "customer-management",
            component: () => import("@/pages/customer-management/CustomerManagementPage.vue"),
            meta: { layout: "default", title: "Customer Management" },
        },
    ],
});

export { router };
