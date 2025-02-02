<script setup>
import { ref, watch } from "vue";
import { GET, siteURL } from "./utils";
import Site from "./components/Site.vue";
import SecureToggle from "./components/SecureToggle.vue";

let { data: sites, loading } = GET(siteURL, true);
let secure = ref(true);
let reload = ref(false);

// check server if active
let { status, loading: load } = GET("up");

watch(
  () => secure,
  () => {
    reload.value = true;
    setTimeout(() => {
      reload.value = false;
    }, 100);
  },
  { deep: true }
);
</script>

<template>
  <div class="p-20 font-[Jost] bg-gray-900 text-white/75 min-h-screen">
    <section class="max-w-[1290px] mx-auto">
      <h1 class="text-center text-5xl tracking-widest pl-14">STATUS 🌤️</h1>
      <div class="py-2 text-center tracking-[20px] text-xs opacity-25">{{ status === 200 ? "SERVER" : "LOCAL" }}</div>
      <div class="flex py-2 justify-center gap-2">
        <SecureToggle v-model="secure" />
      </div>
      <div v-if="loading" class="py-10">... LOADING ...</div>
      <div v-else-if="!reload && status" class="py-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
        <Site v-for="site in sites" :key="site.domain" :domain="site.domain" :https="secure" :local="!(status === 200)" />
      </div>
    </section>
  </div>
</template>
