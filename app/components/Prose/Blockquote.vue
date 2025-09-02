<template>
  <blockquote class="rounded-md max-w-3xl">
    <slot></slot>
  </blockquote>
</template>

<style scoped>
blockquote {
  padding: 16px !important;
  border-left: 8px solid seagreen;
  background-color: rgba(22, 101, 52, 0.2) !important;

  & > * {
    margin: 0;
  }
}
</style>
