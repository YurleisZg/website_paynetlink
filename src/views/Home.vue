<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-800 mb-4">
        Bienvenido a PayNetLink
      </h1>
      <p class="text-xl text-gray-600 mb-8">
        Proyecto Vue 3 con Tailwind CSS y Vue Router
      </p>
      <div class="space-x-4">
        <router-link
          to="/"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Inicio
        </router-link>
        <router-link
          to="/about"
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Acerca de
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
// Componente Home
</script>
