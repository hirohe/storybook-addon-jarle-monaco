import { parse } from '@babel/parser'
import traverse from '@babel/traverse'
import MonacoJSXHighlighter from 'monaco-jsx-highlighter'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'

export default function applyJsxHighlighter(
  monacoInstance: typeof monaco,
  editor: monaco.editor.IStandaloneCodeEditor
) {
  const monacoJSXHighlighter = new MonacoJSXHighlighter(
    monacoInstance,
    parse,
    traverse,
    editor
  )
  monacoJSXHighlighter.highlightOnDidChangeModelContent()
  monacoJSXHighlighter.addJSXCommentCommand()

  return monacoJSXHighlighter
}
