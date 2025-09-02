<template>
  <code
    class="border border-dashed py-0.5 px-2 rounded bg-slate-800 border-accented"
  >
    <slot></slot>
  </code>
</template>

<style scoped>
code {
    font-weight: normal;
    font-size: 15px;
    display: inline-block;
    line-height: 1.4;
}

code::after,
code::before {
  content: "";
}
</style>
