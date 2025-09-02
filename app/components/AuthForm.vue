<script setup lang="ts">
import { LazyAuthForm } from "#components";
import type { TabsItem } from "@nuxt/ui";

const tabs: TabsItem[] = [
  {
    label: "Sign in",
    slot: "signin" as const,
  },
  {
    label: "Register",
    slot: "register" as const,
  },
];
</script>

<template>
  <section class="grid gap-4 p-12">
    <UTabs :items="tabs" variant="link">
      <template #signin="{ item }">
        <LazyLoginForm />
      </template>
      <template #register="{ item }">
        <LazyRegisterForm />
      </template>
    </UTabs>

    <USeparator label="or" class="my-2" />

    <UButton class="justify-center" variant="outline">
      <icon name="logos:google-icon" /> Continue with Google
    </UButton>
  </section>
</template>
