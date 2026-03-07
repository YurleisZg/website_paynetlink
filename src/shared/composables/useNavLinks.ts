import type { NavLink } from "@/widgets/navigation";
import {
    Bell,
    Building2,
    Code,
    CreditCard,
    Database,
    FileText,
    Globe,
    HelpCircle,
    Info,
    Mail,
    PenLine,
    Router,
    Trophy,
    Users,
    Wifi,
} from "lucide-vue-next";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

// Returns the full site navigation links with dropdown menus.
// Used by all pages that include the main Navbar.
export function useNavLinks() {
    const { t } = useI18n();

    const navLinks = computed<NavLink[]>(() => [
        {
            label: t("nav.links.products"),
            dropdown: [
                {
                    label: t("nav.dropdown.products.clients.label"),
                    description: t("nav.dropdown.products.clients.description"),
                    href: "/customer-management",
                    icon: Users,
                },
                {
                    label: t("nav.dropdown.products.billing.label"),
                    description: t("nav.dropdown.products.billing.description"),
                    href: "/payment-module",
                    icon: CreditCard,
                },
                {
                    label: t("nav.dropdown.products.network.label"),
                    description: t("nav.dropdown.products.network.description"),
                    href: "/network-automation",
                    icon: Router,
                },
                {
                    label: t("nav.dropdown.products.notifications.label"),
                    description: t("nav.dropdown.products.notifications.description"),
                    href: "/#notificaciones",
                    icon: Bell,
                },
                {
                    label: t("nav.dropdown.products.invoicing.label"),
                    description: t("nav.dropdown.products.invoicing.description"),
                    href: "/#facturacion",
                    icon: FileText,
                },
            ],
        },
        {
            label: t("nav.links.solutions"),
            dropdown: [
                {
                    label: t("nav.dropdown.solutions.smallIsp.label"),
                    description: t("nav.dropdown.solutions.smallIsp.description"),
                    href: "/#isp-pequenos",
                    icon: Building2,
                },
                {
                    label: t("nav.dropdown.solutions.mediumIsp.label"),
                    description: t("nav.dropdown.solutions.mediumIsp.description"),
                    href: "/#isp-medianos",
                    icon: Database,
                },
                {
                    label: t("nav.dropdown.solutions.wisps.label"),
                    description: t("nav.dropdown.solutions.wisps.description"),
                    href: "/#wisps",
                    icon: Wifi,
                },
            ],
        },
        { label: t("nav.links.pricing"), href: "/#precios" },
        {
            label: t("nav.links.resources"),
            dropdown: [
                {
                    label: t("nav.dropdown.resources.blog.label"),
                    description: t("nav.dropdown.resources.blog.description"),
                    href: "/#blog",
                    icon: PenLine,
                },
                {
                    label: t("nav.dropdown.resources.helpCenter.label"),
                    description: t("nav.dropdown.resources.helpCenter.description"),
                    href: "/#ayuda",
                    icon: HelpCircle,
                },
                {
                    label: t("nav.dropdown.resources.apiDocs.label"),
                    description: t("nav.dropdown.resources.apiDocs.description"),
                    href: "/#api",
                    icon: Code,
                },
                {
                    label: t("nav.dropdown.resources.caseStudies.label"),
                    description: t("nav.dropdown.resources.caseStudies.description"),
                    href: "/success-stories",
                    icon: Trophy,
                },
            ],
        },
        {
            label: t("nav.links.company"),
            dropdown: [
                {
                    label: t("nav.dropdown.company.about.label"),
                    description: t("nav.dropdown.company.about.description"),
                    href: "/about",
                    icon: Info,
                },
                {
                    label: t("nav.dropdown.company.contact.label"),
                    description: t("nav.dropdown.company.contact.description"),
                    href: "/contact",
                    icon: Mail,
                },
                {
                    label: t("nav.dropdown.company.partners.label"),
                    description: t("nav.dropdown.company.partners.description"),
                    href: "/#partners",
                    icon: Globe,
                },
            ],
        },
    ]);

    return { navLinks };
}
