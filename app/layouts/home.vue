<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";
import { tutorialsList } from "~/assets/data/tutorials-list";

const menuItems: NavigationMenuItem[] = [
  {
    label: "Home",
    to: "/",
  },
  {
    label: "Tutorials",
    children: tutorialsList,
  },
];
</script>

<template>
  <header class="px-4 py-2 flex items-center gap-2 border-b border-b-accented">
    <div class="flex-1 flex gap-2 items-center">
      <USlideover title="Hirescript" side="left" class="max-w-xs md:hidden">
        <UButton
          icon="uil:bars"
          color="neutral"
          variant="ghost"
          class="p-0"
          size="xl"
        />

        <template #body>
          <lazy-u-navigation-menu
            orientation="vertical"
            color="primary"
            :items="menuItems"
            class="flex-1 mx-auto justify-center"
          />
        </template>
      </USlideover>

      <nuxt-link to="/" class="text-xl">Hirescript</nuxt-link>
    </div>

    <lazy-u-navigation-menu
      color="primary"
      :items="menuItems"
      class="flex-1 mx-auto justify-center hidden md:flex"
    />
    <Themes />
  </header>

  <main class="p-4 container">
    <NuxtPage />
  </main>
</template>
