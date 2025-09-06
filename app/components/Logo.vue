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
        class="w-8 not-dark:invert lg:block"
        :class="{ 'hidden': !showIcon }"
      />
      <span>Hirescript</span>
    </div>
  </nuxt-link>
</template>
