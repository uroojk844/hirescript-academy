<script setup lang="ts">
const text = ref<HTMLButtonElement>();
const { showCopyBtn = true } = defineProps<{
  language: string;
  highlights: number[];
  filename: string;
  code: string;
  showCopyBtn?: boolean;
}>();
</script>

<template>
  <div class="bg-slate-950 rounded-md my-8 max-w-3xl">
    <section
      class="flex justify-between items-center py-2 px-4 border-b border-slate-800"
    >
      <div class="flex gap-2 menu">
        <span class="block size-2.5 rounded-full"></span>
        <span class="block size-2.5 rounded-full bg-yellow-400"></span>
        <span class="block size-2.5 rounded-full bg-green-400"></span>
      </div>

      <small class="[&>p]:m-0">
        <slot name="title">{{ filename }}</slot>
      </small>
    </section>
    <div class="code_container overflow-auto relative">
      <pre class="shiki-themes language-html text-wrap">{{ code }}</pre>
      <CopyButton
        v-if="showCopyBtn"
        class="bottom-2.5 top-auto right-2.5"
        text="copy"
      />
    </div>
  </div>
</template>

<style scoped>
@reference "@/assets/css/main.css";

li {
  @apply size-2.5 rounded-full;
}

pre {
  font-size: 15px !important;
  margin: 0 !important;
}

.menu {
  span:nth-child(1) {
    background-color: tomato !important;
  }
  span:nth-child(2) {
    background-color: gold !important;
  }
  span:nth-child(3) {
    background-color: seagreen !important;
  }
}
</style>
>
