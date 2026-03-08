import { useHead, useSeoMeta } from "@unhead/vue";
import { SEO_CONFIG, type SeoMeta } from "@/shared/config/seo";

export function useSeo(meta: SeoMeta): void {
    const canonicalUrl = meta.canonicalPath
        ? `${SEO_CONFIG.siteUrl}${meta.canonicalPath}`
        : SEO_CONFIG.siteUrl;

    const ogImage = meta.image ?? SEO_CONFIG.defaultImage;
    const ogImageAlt = meta.imageAlt ?? meta.title;

    useHead({
        title: meta.title,
        link: [{ rel: "canonical", href: canonicalUrl }],
        ...(meta.noindex && {
            meta: [{ name: "robots", content: "noindex, nofollow" }],
        }),
    });

    useSeoMeta({
        title: meta.title,
        description: meta.description,
        ...(meta.keywords && { keywords: meta.keywords }),

        // Open Graph
        ogType: "website",
        ogSiteName: SEO_CONFIG.siteName,
        ogTitle: meta.title,
        ogDescription: meta.description,
        ogUrl: canonicalUrl,
        ogImage,
        ogImageAlt,
        ogImageWidth: SEO_CONFIG.defaultImageWidth,
        ogImageHeight: SEO_CONFIG.defaultImageHeight,
        ogLocale: SEO_CONFIG.defaultLocale,

        // Twitter / X Card
        twitterCard: "summary_large_image",
        twitterSite: SEO_CONFIG.twitterHandle,
        twitterTitle: meta.title,
        twitterDescription: meta.description,
        twitterImage: ogImage,
        twitterImageAlt: ogImageAlt,
    });
}
