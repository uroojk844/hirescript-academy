<script setup lang="ts">
import { NuxtLayout } from "#components";

const { $pwa } = useNuxtApp();

onMounted(() => {
  if ($pwa?.offlineReady) console.log("Offline mode");
});
</script>

<template>
  <vite-pwa-manifest />
  <NuxtLayout />
</template>
