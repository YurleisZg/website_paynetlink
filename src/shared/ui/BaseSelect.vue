<script setup lang="ts">
import { ChevronDown } from "lucide-vue-next";

defineOptions({ name: "BaseSelect" });

withDefaults(
    defineProps<{
        label?: string;
        placeholder?: string;
        modelValue?: string;
        options?: Array<{ value: string; label: string }>;
        id?: string;
        disabled?: boolean;
        required?: boolean;
    }>(),
    {
        placeholder: "Seleccionar",
        modelValue: "",
        options: () => [],
        label: undefined,
        id: undefined,
    }
);

defineEmits<{
    "update:modelValue": [value: string];
}>();
</script>

<template>
    <div class="flex w-full flex-col gap-1.5">
        <label v-if="label" :for="id" class="text-[13px] font-medium text-[#333333]">
            {{ label }}
        </label>
        <div class="relative">
            <select
                :id="id"
                :value="modelValue"
                :disabled="disabled"
                :required="required"
                class="h-11 w-full appearance-none rounded-md border border-[#DDDDDD] bg-white px-3.5 pr-10 text-sm text-foreground outline-none transition-colors placeholder:text-[#BBBBBB] focus:border-primary focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
            >
                <option value="" disabled selected hidden>{{ placeholder }}</option>
                <option v-for="option in options" :key="option.value" :value="option.value">
                    {{ option.label }}
                </option>
            </select>
            <ChevronDown
                :size="16"
                class="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[#999999]"
            />
        </div>
    </div>
</template>
