import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import HTMLWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import CSSWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import JSONWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import TSWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

const _code = ref("");

export const getCode = computed(() => _code.value)

export function setCode(text:string, redirect = false) {
  const router = useRouter();
  redirect && router.push("/playground");
  _code.value = text;
}

export function createEditor(element: HTMLElement, lang: string = "html") {
  const { $monaco } = useNuxtApp();
  const { preference } = useColorMode();

  self.MonacoEnvironment = {
    getWorker: function (_: any, label: string) {
      switch (label) {
        case "json":
          return new JSONWorker();
        case "css":
        case "scss":
        case "less":
          return new CSSWorker();
        case "html":
          return new HTMLWorker();
        case "typescript":
        case "javascript":
          return new TSWorker();
        default:
          return new EditorWorker();
      }
    },
  };

  let codeEditor = $monaco.editor.create(element, {
    automaticLayout: true,
    "semanticHighlighting.enabled": true,
    copyWithSyntaxHighlighting: true,
    fontLigatures: true,
    fontFamily: "cascadia code",
    fontSize: 18,
    suggestOnTriggerCharacters: true,
    formatOnPaste: true,
    formatOnType: true,
    quickSuggestions: { other: true, strings: true, comments: true },
    wordWrap: "bounded",
    guides: {
      bracketPairs: true,
      highlightActiveBracketPair: true,
      indentation: true,
    },
  });

  $monaco.editor.defineTheme("my", {
    base: "vs-dark",
    rules: [],
    inherit: true,
    colors: {
      "editor.background": "#0F111A",
    },
  });

  $monaco.editor.setTheme(preference == "dark" ? "my" : "vs");
  if (codeEditor?.getModel) {
    $monaco.editor.setModelLanguage(codeEditor.getModel()!, lang);
  }
  return codeEditor;
}
