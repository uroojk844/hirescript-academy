<script setup lang="ts">
import type { NavigationMenuItem, TabsItem } from "@nuxt/ui";
import { menuItems } from "~/router";

defineProps<{
  sidebarItems?: NavigationMenuItem[];
}>();


const tabs: TabsItem[] = [
  {
    label: "Chapters",
    slot: "chapters" as const,
  },
  {
    label: "Menu",
    slot: "menu" as const,
  },
];
</script>

<template>
  <header
    class="print:hidden px-4 py-2 flex items-center gap-2 border-b border-b-accented"
  >
    <div class="flex gap-2 items-center">
      <USlideover title="Hirescript" side="left" class="lg:hidden">
        <UButton
          aria-label="open sidebar"
          aria-expanded="false"
          icon="uil:bars"
          variant="link"
          class="p-0 text-slate-950 dark:text-white"
          size="xl"
        />

        <template #header="{ close }">
          <div class="flex w-full justify-between">
            <Logo :show-icon="true" />
            <UButton
              aria-label="close sidebar"
              aria-expanded="true"
              @click="close"
              icon="uil:times"
              variant="link"
              class="p-0 text-slate-950 dark:text-white"
              size="xl"
            />
          </div>
        </template>

        <template #body>
          <UTabs v-if="sidebarItems" :items="tabs">
            <template #chapters="{ item }">
              <lazy-u-navigation-menu
                orientation="vertical"
                color="primary"
                :items="sidebarItems"
                class="flex-1 mx-auto justify-center"
              />
            </template>
            <template #menu="{ item }">
              <lazy-u-navigation-menu
                orientation="vertical"
                color="primary"
                :items="menuItems"
                class="flex-1 mx-auto justify-center"
              />
            </template>
          </UTabs>

          <lazy-u-navigation-menu
            v-else
            orientation="vertical"
            color="primary"
            :items="menuItems"
            class="flex-1 mx-auto justify-center"
          />
        </template>
      </USlideover>
      <Logo />
    </div>

    <lazy-u-navigation-menu
      color="primary"
      :items="menuItems"
      class="mx-auto w-full max-w-xl justify-center hidden lg:flex"
    />

    <Themes />
  </header>
</template>
