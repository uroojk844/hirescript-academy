import { defineNuxtPlugin } from "#app";
import * as monaco from "monaco-editor";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      monaco,
    },
  };
});
