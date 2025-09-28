<script setup lang="ts">
const { text } = defineProps<{
  text: string;
}>();

const copied = ref(false);

async function copy() {
  copied.value = await copyCode(text);
  setTimeout(() => {
    copied.value = false;
  }, 2000);
}
</script>

<template>
  <button
    data-tooltip="Copy code"
    @click="copy"
    class="grid place-items-center hover:opacity-100 active:scale-95 bg-transparent tooltip"
  >
    <icon v-if="copied" name="mdi:check" class="text-green-800" />
    <icon v-else name="uil:copy" />
  </button>
</template>
