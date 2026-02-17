<script setup lang="ts">
defineOptions({ name: "BaseInput" });

withDefaults(
    defineProps<{
        label?: string;
        placeholder?: string;
        modelValue?: string;
        type?: string;
        id?: string;
        disabled?: boolean;
        required?: boolean;
    }>(),
    { type: "text", placeholder: "", modelValue: "", label: undefined, id: undefined }
);

defineEmits<{
    "update:modelValue": [value: string];
}>();
</script>

<template>
    <div class="flex w-full flex-col gap-1.5">
        <label v-if="label" :for="id" class="font-body text-sm font-medium text-secondary">
            {{ label }}
        </label>
        <div
            class="flex h-12 items-center rounded-md border border-input-border px-4 transition-colors focus-within:border-primary focus-within:ring-1 focus-within:ring-primary"
        >
            <input
                :id="id"
                :type="type"
                :placeholder="placeholder"
                :value="modelValue"
                :disabled="disabled"
                :required="required"
                class="h-full w-full bg-transparent font-body text-sm text-foreground placeholder:text-placeholder outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-base"
                @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
            />
        </div>
    </div>
</template>
