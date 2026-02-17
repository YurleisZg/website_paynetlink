<script setup lang="ts">
import { ref } from "vue";
import { Eye, EyeOff } from "lucide-vue-next";

defineOptions({ name: "PasswordInput" });

withDefaults(
    defineProps<{
        label?: string;
        placeholder?: string;
        modelValue?: string;
        id?: string;
        disabled?: boolean;
        required?: boolean;
    }>(),
    { placeholder: "", modelValue: "", label: undefined, id: undefined }
);

defineEmits<{
    "update:modelValue": [value: string];
}>();

const showPassword = ref(false);

const togglePassword = () => {
    showPassword.value = !showPassword.value;
};
</script>

<template>
    <div class="flex w-full flex-col gap-1.5">
        <label
            v-if="label"
            :for="id || 'password-input'"
            class="font-body text-sm font-medium text-secondary"
        >
            {{ label }}
        </label>
        <div
            class="flex h-12 items-center rounded-md border border-input-border px-4 transition-colors focus-within:border-primary focus-within:ring-1 focus-within:ring-primary"
        >
            <input
                :id="id || 'password-input'"
                :type="showPassword ? 'text' : 'password'"
                :placeholder="placeholder"
                :value="modelValue"
                :disabled="disabled"
                :required="required"
                class="h-full flex-1 bg-transparent font-body text-sm text-foreground placeholder:text-placeholder outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-base"
                @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
            />
            <button
                type="button"
                class="ml-2 text-subtle transition-colors hover:text-muted focus:outline-none"
                :aria-label="showPassword ? 'Hide password' : 'Show password'"
                @click="togglePassword"
            >
                <EyeOff v-if="showPassword" :size="18" />
                <Eye v-else :size="18" />
            </button>
        </div>
    </div>
</template>
