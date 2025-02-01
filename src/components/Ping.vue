<script setup>
const { status, loading } = defineProps(["status", "loading"]);
</script>
<template>
  <span v-if="status === 200 || loading" class="absolute flex size-4 -top-2 -right-2">
    <span
      class="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
      :class="[{ 'bg-green-200': status === 200 }, { 'bg-orange-200': loading }]"
    />
    <span class="relative inline-flex size-4 rounded-full" :class="[{ 'bg-green-500': status === 200 }, { 'bg-orange-400': loading }]" />
  </span>
  <span v-else class="size-4 absolute -top-2 -right-2 bg-red-400 rounded-full" />
</template>