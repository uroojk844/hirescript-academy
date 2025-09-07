<script setup lang="ts">
const route = useRoute();
const { data: page, pending } = await useAsyncData(
  `${route.params.course}-first-page`,
  () => queryCollection("content").path(`/${route.params.course}`).first()
);
</script>

<template>
  <NuxtLoadingIndicator :height="8" v-if="pending" />
  <ContentRenderer v-else-if="page && !pending" :value="page" />
  <div v-else>Page not found! <NuxtLink to="/">Go Back</NuxtLink></div>
</template>
