import React, { useCallback, useEffect, useState } from 'react'
import MonacoEditor, { OnMount } from '@monaco-editor/react'
import { Channel } from '@storybook/addons'
import { defaultEditorOptions, event } from '../constants'
import EditorWrapper from './EditorWrapper'
import applyJsxHighlighter from '../utils/apply-jsx-highlighter'

export interface LiveEditorProps {
  channel: Channel
}

const LiveEditor: React.FC<LiveEditorProps> = ({ channel }) => {
  const [code, setCode] = useState('')

  const loadSource = useCallback((val) => {
    setCode(val)
  }, [])

  const onChange = useCallback((val) => {
    channel.emit(`${event.UpdateSource}`, val)
  }, [])

  useEffect(() => {
    channel.on(event.LoadSource, loadSource)

    return () => {
      channel.removeListener(event.LoadSource, loadSource)
    }
  }, [])

  const onMount = useCallback<OnMount>((editor, _monaco) => {
    applyJsxHighlighter(_monaco, editor)
  }, [])

  return (
    <EditorWrapper>
      <MonacoEditor
        height="100%"
        language="javascript"
        theme="vs-dark"
        options={defaultEditorOptions}
        value={code}
        onChange={onChange}
        onMount={onMount}
      />
    </EditorWrapper>
  )
}

export default LiveEditor
