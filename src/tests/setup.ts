import { vi } from "vitest";
import { defineComponent, h } from "vue";

// Stub component to replace all lucide-vue-next icons in tests.
// Avoids "Cannot destructure property 'slots' of undefined" caused by
// lucide-vue-next functional components in the happy-dom environment.
const LucideStub = defineComponent({
    name: "LucideStub",
    props: { size: { type: Number, default: 24 } },
    setup(props) {
        return () => h("svg", { width: props.size, height: props.size });
    },
});

vi.mock("lucide-vue-next", () => {
    return new Proxy(
        {},
        {
            get(_target, name) {
                if (name === "__esModule") return true;
                if (typeof name !== "string") return undefined;
                return LucideStub;
            },
            has() {
                return true;
            },
        }
    );
});
