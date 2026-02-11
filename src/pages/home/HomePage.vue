<script setup lang="ts">
defineOptions({
    name: "HomePage",
});
</script>

<template>
    <div class="min-h-screen bg-gray-100 flex items-center justify-center">
        <div class="text-center">
            <h1 class="text-4xl font-bold text-gray-800 mb-4">Welcome to PayNetLink</h1>
            <p class="text-xl text-gray-600 mb-8">Vue 3 project with Tailwind CSS and Vue Router</p>
            <div class="space-x-4">
                <router-link
                    to="/"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Home
                </router-link>
                <router-link
                    to="/about"
                    class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                    About
                </router-link>
            </div>
        </div>
    </div>
</template>
