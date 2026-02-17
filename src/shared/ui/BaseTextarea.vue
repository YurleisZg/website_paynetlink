<script setup lang="ts">
defineOptions({ name: "BaseTextarea" });

withDefaults(
    defineProps<{
        label?: string;
        placeholder?: string;
        modelValue?: string;
        id?: string;
        disabled?: boolean;
        required?: boolean;
        rows?: number;
    }>(),
    {
        placeholder: "",
        modelValue: "",
        rows: 4,
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
        <textarea
            :id="id"
            :placeholder="placeholder"
            :value="modelValue"
            :disabled="disabled"
            :required="required"
            :rows="rows"
            class="w-full rounded-md border border-[#DDDDDD] bg-white px-3.5 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-[#BBBBBB] focus:border-primary focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
            @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
        />
    </div>
</template>
