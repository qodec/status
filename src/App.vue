<script setup>
import { ref, watch } from "vue";
import { GET, siteURL } from "./utils";
import Site from "./components/Site.vue";
import SecureToggle from "./components/SecureToggle.vue";

let { data: sites, loading } = GET(siteURL, true);
let groupSites = ref(null);

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

watch(
  () => sites,
  () => {
    if (sites.value.length)
      groupSites.value = sites.value.reduce((acc, item) => {
        if (item.status == "inactive") return acc;
        if (!acc[item.tag]) acc[item.tag] = [];
        acc[item.tag].push(item);
        return acc;
      }, {});
  },
  { deep: true }
);
</script>

<template>
  <div class="p-20 font-[Jost] bg-gray-900 text-white/75 min-h-screen">
    <section class="max-w-[1440px] mx-auto">
      <h1 class="text-center text-5xl tracking-widest pl-14">STATUS 🌤️</h1>
      <div class="py-2 text-center tracking-[12px] text-xs opacity-25">{{ status === 200 ? "SERVER" : "LOCAL" }} - {{ sites.length }}</div>
      <div class="flex py-2 justify-center gap-2">
        <SecureToggle v-model="secure" />
      </div>
      <div v-if="loading" class="py-10">... LOADING ...</div>
      <div v-else-if="!reload && status && groupSites">
        <div v-for="(group, tag) in groupSites" :key="tag" class="pt-12">
          <div class="tracking-[10px] opacity-40">GROUP {{ tag }}</div>
          <div class="py-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-12">
            <Site v-for="site in group" :key="site.domain" :domain="site.domain" :secure="secure" :local="!(status === 200)" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
