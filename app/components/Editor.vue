<script setup lang="ts">
const text = ref<HTMLSpanElement>();
const { showCopyBtn = true } = defineProps<{
  showCopyBtn?: boolean;
}>();
</script>

<template>
  <div class="bg-slate-950 rounded-md my-8 max-w-3xl">
    <section
      class="flex justify-between items-center py-2 px-4 border-b border-slate-800"
    >
      <div class="flex gap-2">
        <span class="block size-2.5 rounded-full bg-red-400"></span>
        <span class="block size-2.5 rounded-full bg-yellow-400"></span>
        <span class="block size-2.5 rounded-full bg-green-400"></span>
      </div>

      <small class="[&>p]:m-0">
        <slot name="title">index.html</slot>
      </small>
    </section>
    <div class="code_container overflow-auto relative">
      <span ref="text" class="[&>pre]:text-pretty [&>pre]:m-0">
        <slot></slot>
      </span>
      <CopyButton
        v-if="showCopyBtn"
        class="bottom-2.5 top-auto right-2.5"
        :text="text?.textContent || ''"
      />
    </div>
  </div>
</template>

<style scoped> 
@reference "@/assets/css/main.css";

li {
  @apply size-2.5 rounded-full;
}
</style>
