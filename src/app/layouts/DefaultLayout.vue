<script setup lang="ts">
defineOptions({
    name: "DefaultLayout",
});
</script>

<template>
    <div class="default-layout">
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
