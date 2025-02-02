<script setup>
import { GET } from "../utils";
import Ping from "./Ping.vue";

// const props = defineProps(["domain", "https"]);
const { domain, secure, local } = defineProps({
  domain: { type: String, required: true },
  secure: { type: Boolean, default: true },
  local: { type: Boolean, default: false },
});

let { status, loading } = GET(`${secure ? "https" : "http"}://${domain}`, false, local);

// let status = 400;
// let loading = false;
</script>
<template>
  <div class="border-white/20 border-1 rounded-lg p-6 font-light tracking-widest text-base relative">
    <div class="whitespace-nowrap overflow-hidden text-ellipsis" :title="domain">{{ domain }}</div>
    <Ping :status="status" :loading="loading" :secure="secure" :domain="domain" />
  </div>
</template>