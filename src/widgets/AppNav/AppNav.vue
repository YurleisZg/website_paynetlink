<script setup lang="ts">
defineOptions({
    name: "AppNav",
});
</script>

<template>
    <nav class="flex gap-4 p-4 bg-white shadow">
        <router-link to="/" class="text-blue-600 hover:underline">Home</router-link>
        <router-link to="/about" class="text-blue-600 hover:underline">About</router-link>
    </nav>
</template>
