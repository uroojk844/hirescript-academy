<script setup lang="ts">
const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set(_isDark) {
    colorMode.preference = _isDark ? "dark" : "light";
  },
});
</script>

<template>
  <div class="flex gap-2 items-center justify-end max-lg:ml-auto">
    <ClientOnly v-if="!colorMode?.forced">
      <UButton
        :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
        color="neutral"
        variant="outline"
        size="md"
        @click="isDark = !isDark"
      />

      <template #fallback>
        <div class="size-8"></div>
      </template>
    </ClientOnly>

    <UModal>
      <u-button>Sign in</u-button>

      <template #content>
        <lazy-auth-form />
      </template>
    </UModal>
  </div>
</template>
