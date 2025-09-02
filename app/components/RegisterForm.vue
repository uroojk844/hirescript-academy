<script setup lang="ts">
const state = ref({
  name: "",
  email: "",
  password: "",
  cpassword: "",
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
    <UFormField label="Full name">
      <UInput
        placeholder="Enter your full name"
        v-model="state.name"
        class="w-full"
      />
    </UFormField>

    <UFormField label="Email">
      <UInput
        placeholder="Enter your email"
        v-model="state.email"
        class="w-full"
      />
    </UFormField>

    <UFormField label="Password">
      <UInput
        placeholder="Create a password"
        type="password"
        v-model="state.password"
        class="w-full"
      />
    </UFormField>

    <UFormField label="Confirm password">
      <UInput
        placeholder="Confirm password"
        type="password"
        v-model="state.cpassword"
        class="w-full mb-2"
      />
    </UFormField>

    <UButton class="justify-center">Create account</UButton>
    <!-- <small @click="">Already have an account? Sign in</small> -->
  </u-form>
</template>
