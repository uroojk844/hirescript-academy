<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const { data: courses } = await useAsyncData("courses", () =>
  queryCollectionNavigation("content").order("navigation", "ASC")
);

const route = useRoute();

const sidebarItems = computed<NavigationMenuItem[]>(() => {
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

const currentRouteIndex = computed(() => {
  return sidebarItems.value.findIndex((i) => i.to == route.path);
});
</script>

<template>
  <AppHeader :sidebarItems />

  <div class="grid lg:grid-cols-[280px_auto] h-[calc(100vh-65px)] container">
    <aside
      class="hidden print:hidden lg:grid p-4 gap-4 border-r border-accented overflow-x-hidden"
    >
      <u-navigation-menu :items="sidebarItems" orientation="vertical" />
    </aside>
    <main
      class="p-4 prose lg:prose-xl dark:prose-invert max-w-none overflow-y-auto"
    >
      <nuxt-page />

      <div class="flex gap-8 justify-end">
        <UButton variant="soft" :to="sidebarItems[currentRouteIndex - 1]?.to">
          Prev
        </UButton>
        <UButton :to="sidebarItems[currentRouteIndex + 1]?.to">Next</UButton>
      </div>
    </main>
  </div>
</template>
