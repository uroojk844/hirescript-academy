<script setup lang="ts">
const text = ref<HTMLSpanElement>();
const { showCopyBtn = true } = defineProps<{
  showCopyBtn?: boolean;
}>();

const preview = ref(false);

function togglePreview() {
  preview.value = !preview.value;
}

const title = ref<HTMLElement>();

const isHTML = computed(() => title.value?.textContent.endsWith(".html"));
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
        <small class="[&>p]:m-0" ref="title">
          <slot name="title">index.html</slot>
        </small>

        <button
          v-if="isHTML"
          data-tooltip="Open in playgound"
          @click="() => setCode(text?.textContent || '', true)"
          class="grid place-items-center"
        >
          <icon
            name="material-symbols:deployed-code-outline"
            class="cursor-pointer"
          />
        </button>

        <button
          v-if="isHTML"
          @click="togglePreview"
          class="grid place-items-center"
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
        class="bg-white size-full h-96 rounded-b-md"
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
