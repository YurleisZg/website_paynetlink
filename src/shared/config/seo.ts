export const SEO_CONFIG = {
    siteName: "PayNetLink",
    siteUrl: "https://paynetlink.com",
    defaultLocale: "es_CO",
    twitterHandle: "@paynetlink",
    defaultImage: "https://paynetlink.com/og-image.jpg",
    defaultImageWidth: 1200,
    defaultImageHeight: 630,
    themeColor: "#2563eb",
} as const;

export interface SeoMeta {
    title: string;
    description: string;
    canonicalPath?: string;
    image?: string;
    imageAlt?: string;
    noindex?: boolean;
    keywords?: string;
}

export const PAGE_SEO: Record<string, SeoMeta> = {
    home: {
        title: "PayNetLink — Software de gestión para ISP en Latinoamérica",
        description:
            "Automatiza la gestión de clientes, cobros, red MikroTik y facturación electrónica de tu ISP. Reduce errores, cobra más rápido y opera con total control.",
        canonicalPath: "/",
        keywords:
            "software ISP, gestión ISP, administración proveedores internet, MikroTik, cobros automáticos, facturación electrónica ISP, PayNetLink",
    },
    about: {
        title: "Quiénes somos — PayNetLink",
        description:
            "Conoce el equipo detrás de PayNetLink, nuestra misión y cómo democratizamos la tecnología para proveedores de internet en Latinoamérica.",
        canonicalPath: "/about",
        keywords:
            "PayNetLink empresa, quiénes somos, misión PayNetLink, tecnología ISP Latinoamérica",
    },
    contact: {
        title: "Contacto — PayNetLink",
        description:
            "Habla con nuestro equipo. Resolvemos tus dudas sobre planes, integraciones o soporte técnico para tu ISP.",
        canonicalPath: "/contact",
        keywords: "contacto PayNetLink, soporte ISP, asesoría PayNetLink",
    },
    "contact-sales": {
        title: "Contactar ventas — PayNetLink",
        description:
            "Habla con un asesor de ventas de PayNetLink y descubre el plan ideal para tu proveedor de internet.",
        canonicalPath: "/contact-sales",
        noindex: true,
    },
    "contact-advisor": {
        title: "Contactar asesor — PayNetLink",
        description:
            "Agenda una sesión con un asesor de PayNetLink para resolver todas tus preguntas sobre el software de gestión ISP.",
        canonicalPath: "/contact-advisor",
        noindex: true,
    },
    plans: {
        title: "Planes y precios — PayNetLink",
        description:
            "Elige el plan de PayNetLink ideal para tu ISP. Desde emprendedores hasta grandes operadores. Sin contratos de largo plazo.",
        canonicalPath: "/plans-and-prices",
        keywords:
            "precios PayNetLink, planes software ISP, cuanto cuesta PayNetLink, plan gratuito ISP",
    },
    privacy: {
        title: "Política de privacidad — PayNetLink",
        description:
            "Conoce cómo PayNetLink protege y gestiona la información de tus datos según nuestra política de privacidad.",
        canonicalPath: "/privacy",
        noindex: false,
    },
    terms: {
        title: "Términos y condiciones — PayNetLink",
        description:
            "Lee los términos y condiciones de uso de PayNetLink, la plataforma de gestión para proveedores de internet.",
        canonicalPath: "/terms-and-conditions",
    },
    "success-stories": {
        title: "Casos de éxito — PayNetLink",
        description:
            "Descubre cómo ISPs en Latinoamérica han transformado su operación con PayNetLink. Historias reales, resultados concretos.",
        canonicalPath: "/success-stories",
        keywords: "casos de éxito ISP, testimonios PayNetLink, clientes PayNetLink",
    },
    "customer-management": {
        title: "Gestión de clientes para ISP — PayNetLink",
        description:
            "Centraliza toda la información de tus clientes, contratos y estado de servicio en un solo panel. Automatiza altas y bajas de servicio.",
        canonicalPath: "/customer-management",
        keywords:
            "gestión clientes ISP, CRM proveedor internet, administrar suscriptores ISP, activar servicios MikroTik",
    },
    "payment-module": {
        title: "Módulo de pagos para ISP — PayNetLink",
        description:
            "Automatiza cobros, recibos y notificaciones de pago para tu ISP. Integración con Wompi, Mercado Pago y más pasarelas.",
        canonicalPath: "/payment-module",
        keywords:
            "cobros automáticos ISP, pagos en línea ISP, pasarela pagos proveedor internet, Wompi, Mercado Pago ISP",
    },
    "network-automation": {
        title: "Automatización de red MikroTik — PayNetLink",
        description:
            "Controla tu red MikroTik de forma automática desde PayNetLink. Activa, suspende y gestiona servicios sin intervención manual.",
        canonicalPath: "/network-automation",
        keywords:
            "automatización MikroTik, gestión red ISP, API MikroTik, RouterOS gestión clientes, suspender servicio automático",
    },
    "electronic-invoicing": {
        title: "Facturación electrónica para ISP — PayNetLink",
        description:
            "Genera facturas electrónicas válidas ante la DIAN integradas a tu flujo de cobro. Cumplimiento fiscal sin complicaciones.",
        canonicalPath: "/electronic-invoicing",
        keywords:
            "facturación electrónica ISP, DIAN Colombia, factura electrónica proveedor internet, integración DIAN",
    },
    notifications: {
        title: "Notificaciones automáticas para ISP — PayNetLink",
        description:
            "Envía recordatorios de pago y avisos de servicio por WhatsApp, SMS o email. Automatiza la comunicación con tus clientes.",
        canonicalPath: "/notifications",
        keywords:
            "notificaciones ISP, recordatorio pago WhatsApp, avisos servicio internet, comunicación clientes ISP",
    },
    "customer-support": {
        title: "Soporte al cliente — PayNetLink",
        description:
            "Centro de ayuda y soporte técnico de PayNetLink. Resuelve dudas sobre el software de gestión para ISP.",
        canonicalPath: "/customer-support",
        keywords: "soporte PayNetLink, ayuda software ISP, centro de ayuda PayNetLink",
    },
    demo: {
        title: "Solicitar demo — PayNetLink",
        description:
            "Agenda una demo gratuita de PayNetLink y descubre cómo automatizar la gestión de tu ISP en menos de 30 minutos.",
        canonicalPath: "/demo",
        keywords: "demo PayNetLink, prueba gratuita software ISP, solicitar demo ISP",
    },
};
