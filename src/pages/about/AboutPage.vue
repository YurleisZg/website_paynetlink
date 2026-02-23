<script setup lang="ts">
import { Container } from "@/shared/ui";

defineOptions({
    name: "AboutPage",
});
</script>

<template>
    <div class="flex min-h-screen items-center justify-center bg-gray-100 px-6 py-20 md:px-20">
        <Container>
            <div class="max-w-2xl text-center">
                <h1 class="mb-4 text-4xl font-bold text-gray-800">About PayNetLink</h1>
                <p class="text-xl text-gray-600">
                    This is the about page. Feature-first architecture with shared, entities,
                    features, and pages layers.
                </p>
            </div>
        </Container>
    </div>
</template>
