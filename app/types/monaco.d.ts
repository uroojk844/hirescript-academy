import * as monaco from "monaco-editor";

declare module "#app" {
  interface NuxtApp {
    $monaco: typeof monaco;
  }
}