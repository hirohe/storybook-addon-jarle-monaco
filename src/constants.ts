import type monaco from 'monaco-editor/esm/vs/editor/editor.api'

export const event = {
  UpdateSource: 'livePreview:updateSource',
  LoadSource: 'livePreview:loadSource',
  SyncOptions: 'livePreview:syncOptions',
}

export const symbol = {
  Scope: Symbol('Scope'),
}

export const defaultEditorOptions: monaco.editor.IStandaloneEditorConstructionOptions =
  {
    fontSize: 16,
    scrollBeyondLastLine: false,
    minimap: {
      enabled: false,
    },
    fixedOverflowWidgets: true,
    scrollbar: {
      alwaysConsumeMouseWheel: false,
    }
  }
