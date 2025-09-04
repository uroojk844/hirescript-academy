<script setup lang="ts">
const text = ref<HTMLSpanElement>();
const { showCopyBtn = true } = defineProps<{
  showCopyBtn?: boolean;
}>();

const preview = ref(false);

function togglePreview() {
  preview.value = !preview.value;
}
</script>

<template>
  <div class="bg-slate-900 rounded-md overflow-hidden my-8 max-w-3xl relative">
    <section
      class="print:hidden flex justify-between items-center py-2 px-4 border-b border-slate-800"
    >
      <div class="flex gap-2">
        <span class="block size-2.5 rounded-full bg-red-400"></span>
        <span class="block size-2.5 rounded-full bg-yellow-400"></span>
        <span class="block size-2.5 rounded-full bg-green-400"></span>
      </div>

      <div class="flex items-center gap-3">
        <small class="[&>p]:m-0">
          <slot name="title">index.html</slot>
        </small>

        <button @click="togglePreview" class="grid place-items-center">
          <icon name="uil:play" class="cursor-pointer" />
        </button>
        <CopyButton v-if="showCopyBtn" :text="text?.textContent || ''" />
      </div>
    </section>
    <div class="code_container aspect-video overflow-auto relative">
      <span v-show="!preview" ref="text" class="code">
        <slot></slot>
      </span>
      <iframe
        v-if="preview"
        class="bg-white inset-0 size-full absolute top-0"
        :srcdoc="text?.textContent"
      ></iframe>
    </div>
  </div>
</template>

<style>
@reference "~/assets/css/main.css";

.code > pre {
  @apply text-wrap bg-slate-900 p-4;
  margin: 0;
  border-top: 0;
}
</style>
