<script setup>
const secure = defineModel();
</script>
<template>
  <span class="text-xs flex p-1 rounded bg-white/10 gap-2">
    <span
      v-for="(t, i) in ['HTTPS', 'HTTP']"
      :key="t"
      v-text="t"
      class="py-1 px-2 rounded cursor-pointer"
      :class="[{ 'bg-orange-500/50': secure && !i }, { 'bg-orange-500/50': !secure && i }]"
      @click="secure = !secure"
    />
  </span>
</template>