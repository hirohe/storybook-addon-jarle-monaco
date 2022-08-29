import { MonacoJsxSyntaxHighlight } from 'monaco-jsx-syntax-highlight'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Worker from 'worker-loader!monaco-jsx-syntax-highlight/lib/worker/index.js'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'

const worker = new Worker()

export default function applyJsxHighlighter(
  monacoInstance: typeof monaco,
  editor: monaco.editor.IStandaloneCodeEditor
): ReturnType<MonacoJsxSyntaxHighlight['highlighterBuilder']> {
  const controller = new MonacoJsxSyntaxHighlight(worker, monacoInstance)
  return controller.highlighterBuilder({ editor })
}
