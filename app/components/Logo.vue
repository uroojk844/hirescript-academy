<script setup lang="ts">
const {showIcon = false}= defineProps<{
  showIcon?: boolean;
}>();
</script>

<template>
  <nuxt-link to="/" class="text-xl">
    <div class="flex gap-2 items-center">
      <img
        src="/favicon.svg"
        alt="hirescript-logo"
        class="w-8 not-dark:invert lg:block"
        :class="{ 'hidden': !showIcon }"
      />
      <span>Hirescript Academy</span>
    </div>
  </nuxt-link>
</template>
