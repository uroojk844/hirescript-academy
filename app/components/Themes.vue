<script setup lang="ts">
const colorMode = useColorMode();
const { $monaco } = useNuxtApp();

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set(_isDark) {
    colorMode.preference = _isDark ? "dark" : "light";
  },
});

function toggleEditorTheme() {
  if (!isDark.value) {
    $monaco.editor.setTheme("vs");
  } else {
    $monaco.editor.setTheme("my");
  }
}

watch(isDark, toggleEditorTheme);
</script>

<template>
  <div class="flex gap-2 items-center justify-end max-lg:ml-auto">
    <ClientOnly v-if="!colorMode?.forced">
      <UButton
        :icon="isDark ? 'uil:sun' : 'uil:moon'"
        aria-label="switch theme"
        :aria-pressed="'Dark theme ' + isDark ? 'enabled' : 'disabled'"
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
