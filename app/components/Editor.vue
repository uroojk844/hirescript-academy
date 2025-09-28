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
  <div
    class="bg-[#e5e5e5] dark:bg-slate-900 rounded-md my-8 max-w-3xl relative border border-accented"
  >
    <section
      class="print:hidden flex justify-between items-center py-2 px-4 border-b border-accented"
    >
      <div class="flex gap-2">
        <span class="block size-2.5 rounded-full bg-red-400"></span>
        <span class="block size-2.5 rounded-full bg-yellow-400"></span>
        <span class="block size-2.5 rounded-full bg-emerald-500"></span>
      </div>

      <div class="flex items-center gap-3">
        <small class="[&>p]:m-0">
          <slot name="title">index.html</slot>
        </small>

        <button
          data-tooltip="Open in playgound"
          @click="() => setCode(text?.textContent || '', true)"
          class="grid place-items-center tooltip"
        >
          <icon
            name="material-symbols:deployed-code-outline"
            class="cursor-pointer"
          />
        </button>

        <button
          @click="togglePreview"
          class="grid place-items-center tooltip"
          :data-tooltip="!preview ? 'Preview' : 'Code'"
        >
          <icon v-if="!preview" name="mdi:web" class="cursor-pointer" />
          <icon v-else name="mdi:code-block-braces" class="cursor-pointer" />
        </button>
        <CopyButton v-if="showCopyBtn" :text="text?.textContent || ''" />
      </div>
    </section>
    <div class="code_container overflow-auto max-h-96">
      <span v-show="!preview" ref="text" class="code">
        <slot></slot>
      </span>
      <iframe
        v-if="preview"
        class="bg-white size-full h-96"
        :srcdoc="text?.textContent"
      ></iframe>
    </div>
  </div>
</template>

<style>
@reference "~/assets/css/main.css";

.code > pre {
  @apply text-wrap dark:bg-slate-900 p-4 rounded-md rounded-t-none;
  margin: 0;
  border-top: 0;
}
</style>
