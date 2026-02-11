<script setup lang="ts">
defineOptions({
    name: "AboutPage",
});
</script>

<template>
    <div class="min-h-screen bg-gray-100 flex items-center justify-center">
        <div class="text-center max-w-2xl">
            <h1 class="text-4xl font-bold text-gray-800 mb-4">About PayNetLink</h1>
            <p class="text-xl text-gray-600">
                This is the about page. Feature-first architecture with shared, entities, features,
                and pages layers.
            </p>
            <router-link
                to="/"
                class="inline-block mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Back to Home
            </router-link>
        </div>
    </div>
</template>
