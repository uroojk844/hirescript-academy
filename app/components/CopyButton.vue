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
    @click="copy"
    class="absolute top-2 right-2 size-10 grid place-items-center rounded opacity-40 hover:opacity-100 active:scale-95"
    :class="{
      'bg-slate-800': !copied,
      'bg-green-800': copied,
    }"
  >
    <icon v-if="copied" name="mdi:check" />
    <icon v-else name="uil:copy"  />
  </button>
</template>

<style >
span.iconify {
  color: white !important;
}
</style>
