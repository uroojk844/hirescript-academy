<script setup lang="ts">
import type { NavigationMenuItem, TabsItem } from "@nuxt/ui";
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

const { data: courses } = await useAsyncData("courses", () =>
queryCollectionNavigation("content")
);

const route = useRoute();
const sidebar = computed<NavigationMenuItem[]>(() => {
  if (route.params.course) {
    return (
      courses.value
        ?.find((course) => course.path.startsWith(`/${route.params.course}`))
        ?.children?.map((child) => ({
          label: child.title,
          to: "/courses" + child.path,
        })) || []
    );
  } else return [];
});
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
          <UTabs :items="tabs">
            <template #chapters="{ item }">
              <lazy-u-navigation-menu
                orientation="vertical"
                color="primary"
                :items="sidebar"
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
  
  <LazyUContainer as="section" hydrate-on-visible>
    <div class="grid md:grid-cols-[250px_auto] h-full">
      <aside class="hidden md:grid p-4 gap-4 border-r border-accented">
        <u-navigation-menu :items="sidebar" orientation="vertical" />
      </aside>
      <main class="p-4 prose lg:prose-xl dark:prose-invert max-w-none">
        <nuxt-page />
      </main>
    </div>
  </LazyUContainer>
</template>
