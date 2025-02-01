<script setup>
import { GET } from "./utils";
import Site from "./components/Site.vue";

let { data: sites, loading } = GET("/status/sites.json", true);
</script>

<template>
  <div class="p-20 font-[Jost] bg-gray-900 text-white/75 min-h-screen">
    <section class="max-w-[1290px] mx-auto">
      <h1 class="text-center text-5xl tracking-widest">STATUS 🌤️</h1>
      <div v-if="loading" class="py-10">... LOADING ...</div>
      <div class="py-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
        <Site v-for="site in sites" :key="site.domain" :domain="site.domain" />
      </div>
    </section>
  </div>
</template>
