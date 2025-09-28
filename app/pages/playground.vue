<script setup lang="ts">
import { htmlTags } from "~/plugins/suggestions/html";
const isLoading = ref<boolean>(true);
const container = ref<HTMLElement>();
const { $monaco } = useNuxtApp();

onMounted(() => {
  if (container.value) {
    isLoading.value = false;
    let codeEditor = createEditor(container.value, "html");
    codeEditor.setValue(getCode.value);

    let c: ReturnType<typeof setTimeout>;
    codeEditor.onDidChangeModelContent(() => {
      if(c) clearTimeout(c);
      c = setTimeout(() => {
        setCode(codeEditor.getValue());
      }, 750);
    });

    $monaco.languages.registerCompletionItemProvider("html", {
      triggerCharacters: ["!", ".", "#"],
      provideCompletionItems(model, position) {
        const word = model.getWordUntilPosition(position);
        const range = new $monaco.Range(
          position.lineNumber,
          word.startColumn,
          position.lineNumber,
          word.endColumn
        );

        const replace = new $monaco.Range(
          position.lineNumber,
          word.startColumn - 1,
          position.lineNumber,
          word.endColumn
        );

        const textUntilCursor = model.getValueInRange(
          new $monaco.Range(
            position.lineNumber,
            1,
            position.lineNumber,
            position.column
          )
        );

        const match = textUntilCursor.match(/([.#])([a-zA-Z0-9\-_]+)$/);
        const firstMatch = match?.at(2) || "";

        return {
          suggestions: [
            {
              label: `.${firstMatch}`,
              kind: $monaco.languages.CompletionItemKind.Snippet,
              insertText: `<div class="${firstMatch}">$0</div>`,
              insertTextRules:
                $monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: `Snippet: <div class="${firstMatch}"></div>`,
              range: replace,
            },
            {
              label: `#${firstMatch}`,
              kind: $monaco.languages.CompletionItemKind.Snippet,
              insertText: `<div id="${firstMatch}">$0</div>`,
              insertTextRules:
                $monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: `Snippet: <div id="${firstMatch}"></div>`,
              range: replace,
            },
            {
              label: "!",
              kind: $monaco.languages.CompletionItemKind.Snippet,
              insertText: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
$0
</body>
</html>`,
              detail: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
|
</body>
</html>`,
              insertTextRules:
                $monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range: replace,
            },
            ...htmlTags.map((tag) => ({
              label: tag,
              kind: $monaco.languages.CompletionItemKind.Snippet,
              insertText: `<${tag}>$0</${tag}>`,
              insertTextRules:
                $monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              range,
            })),
          ],
        };
      },
    });
  }
});

onUnmounted(() => setCode(""));
</script>

<template>
  <div v-if="isLoading" class="grid place-items-center content-center h-full">
    <icon
      name="material-symbols:deployed-code-outline"
      size="80"
      class="animate-bounce"
    />
    <h1 class="text-3xl font-bold animate-pulse">
      Creating workspace for you...
    </h1>
  </div>
  <section v-show="!isLoading" class="grid grid-cols-2 h-full">
    <div ref="container" class="not-dark:border-r border-accented z-0"></div>
    <iframe :srcdoc="getCode" class="size-full"></iframe>
  </section>
</template>
