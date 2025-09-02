<script setup lang="ts">
const state = ref({
  email: "",
  password: "",
});

const toast = useToast();
async function onSubmit() {
  toast.add({
    title: "Success",
    description: "The form has been submitted.",
    color: "success",
  });
}
</script>

<template>
  <u-form :state @submit="onSubmit" class="grid gap-4 mt-4">
    <UFormField label="Email">
      <UInput
        placeholder="Enter your email"
        v-model="state.email"
        class="w-full"
      />
    </UFormField>

    <UFormField label="Password">
      <UInput
        placeholder="Enter your password"
        type="password"
        v-model="state.password"
        class="w-full mb-2"
      />
    </UFormField>

    <UButton class="justify-center">Sign in</UButton>
    <!-- <small @click="">Don't have an account? Create now</small> -->
  </u-form>
</template>
