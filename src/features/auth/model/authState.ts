import { ref, computed, type Ref } from "vue";

const token: Ref<string | null> = ref(null);

export function useAuthState() {
    const isAuthenticated = computed(() => !!token.value);
    function setToken(value: string | null) {
        token.value = value;
        if (value) localStorage.setItem("token", value);
        else localStorage.removeItem("token");
    }
    return { isAuthenticated, setToken };
}
