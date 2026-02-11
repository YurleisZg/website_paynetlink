<script setup lang="ts">
import { AppNav } from "@/widgets/AppNav";

defineOptions({
    name: "DefaultLayout",
});
</script>

<template>
    <div class="default-layout">
        <AppNav />
        <main class="flex-1">
            <slot />
        </main>
    </div>
</template>

<style scoped>
.default-layout {
    min-height: 100vh;
}
</style>
