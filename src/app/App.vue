<script setup>
import { VueQueryDevtools } from "@tanstack/vue-query-devtools";
import { DefaultLayout } from "./layouts";
import { config } from "@/shared/config";

const isDev = config.isDev;
</script>

<template>
    <div id="app">
        <DefaultLayout>
            <router-view />
        </DefaultLayout>
        <VueQueryDevtools v-if="isDev" />
    </div>
</template>

<style>
#app {
    min-height: 100vh;
}
</style>
