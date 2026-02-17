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
        <label v-if="label" :for="id" class="text-[13px] font-medium text-[#333333]">
            {{ label }}
        </label>
        <input
            :id="id"
            :type="type"
            :placeholder="placeholder"
            :value="modelValue"
            :disabled="disabled"
            :required="required"
            class="h-11 w-full rounded-md border border-[#DDDDDD] bg-white px-3.5 text-sm text-foreground outline-none transition-colors placeholder:text-[#BBBBBB] focus:border-primary focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        />
    </div>
</template>
