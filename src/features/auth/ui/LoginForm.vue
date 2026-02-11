<script setup lang="ts">
import { ref } from "vue";
import { Button } from "@/shared/ui";
import type { LoginPayload } from "../api/authApi";

const emit = defineEmits<{
    submit: [payload: LoginPayload];
}>();

const email = ref("");
const password = ref("");

function onSubmit() {
    emit("submit", { email: email.value, password: password.value });
}
</script>

<template>
    <form class="flex flex-col gap-4 max-w-sm" @submit.prevent="onSubmit">
        <input v-model="email" type="email" placeholder="Email" class="border rounded px-3 py-2" />
        <input
            v-model="password"
            type="password"
            placeholder="Password"
            class="border rounded px-3 py-2"
        />
        <Button type="submit">Sign in</Button>
    </form>
</template>
