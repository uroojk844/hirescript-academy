<script setup lang="ts">
const route = useRoute();
const { data: courses, pending } = await useAsyncData(
  `${route.params.course}-first-page`,
  () => queryCollection("content").path(`/${route.params.course}`).first()
);
</script>

<template>
  <NuxtLoadingIndicator v-if="pending" />
  <ContentRenderer v-else-if="courses && !pending" :value="courses" />
  <div v-else>Not found</div>
</template>
