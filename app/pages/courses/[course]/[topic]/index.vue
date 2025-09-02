<script setup lang="ts">
const route = useRoute();

const { data: home, pending } = await useAsyncData(
  `home:${route.params.course}:${route.params.topic}`,
  () =>
    queryCollection("content")
      .path(`/${route.params.course}/${route.params.topic}`)
      .first(),
  {
    watch: [() => route.params],
  }
);
</script>

<template>
  <NuxtLoadingIndicator v-if="pending" />
  <ContentRenderer v-else-if="home" :value="home" />
  <div v-else>Not found</div>
</template>
