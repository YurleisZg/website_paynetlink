<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h1 class="text-4xl font-bold text-gray-800 mb-4">
        Acerca de
      </h1>
      <p class="text-lg text-gray-600 mb-6">
        Esta es una aplicación Vue 3 con las siguientes tecnologías:
      </p>
      <ul class="list-disc list-inside space-y-2 text-gray-700 mb-6">
        <li>Vue 3 - Framework JavaScript progresivo</li>
        <li>Tailwind CSS - Framework de utilidades CSS</li>
        <li>Vue Router - Router oficial para Vue.js</li>
        <li>Vite - Herramienta de construcción rápida</li>
      </ul>
      <router-link
        to="/"
        class="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Volver al inicio
      </router-link>
    </div>
  </div>
</template>

<script setup>
// Componente About
</script>
