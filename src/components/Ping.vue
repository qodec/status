<script setup>
const { status, loading, domain, secure } = defineProps(["status", "loading", "domain", "secure"]);
</script>
<template>
  <a class="absolute flex size-4 -top-2 -right-2" :href="`${secure ? 'https' : 'http'}://${domain}`" target="_blank">
    <span v-if="status === 200 || loading" class="flex size-4">
      <span
        class="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
        :class="[{ 'bg-green-200': status === 200 }, { 'bg-orange-200': loading }]"
      />
      <span class="relative inline-flex size-4 rounded-full" :class="[{ 'bg-green-500': status === 200 }, { 'bg-orange-400': loading }]" />
    </span>
    <span v-else class="size-4 flex bg-red-400 rounded-full" />
  </a>
</template>