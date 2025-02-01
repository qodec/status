<script setup>
import { GET } from "../utils";
import Ping from "./Ping.vue";

const { domain } = defineProps(["domain"]);
let { status, loading } = GET(`\\${domain}`);
</script>
<template>
  <div class="border-white/20 border-1 rounded-lg p-6 font-light tracking-widest text-lg relative">
    <div class="whitespace-nowrap overflow-hidden text-ellipsis" :title="domain">{{ domain }}</div>
    <Ping :status="status" :loading="loading" />
  </div>
</template>