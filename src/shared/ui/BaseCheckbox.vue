<script setup lang="ts">
defineOptions({ name: "BaseCheckbox" });

defineProps<{
    modelValue?: boolean;
    label?: string;
    id?: string;
}>();

defineEmits<{
    "update:modelValue": [value: boolean];
}>();
</script>

<template>
    <label :for="id" class="inline-flex cursor-pointer items-center gap-2">
        <input
            :id="id"
            type="checkbox"
            :checked="modelValue"
            class="h-[18px] w-[18px] cursor-pointer rounded border border-input-border accent-primary"
            @change="$emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
        />
        <span v-if="label" class="font-body text-xs text-secondary md:text-[13px]">
            {{ label }}
        </span>
    </label>
</template>
