import React, { useCallback, useEffect, useState } from 'react'
import { Provider, Preview, Error } from 'jarle'
import MonacoEditor, { EditorProps, OnMount } from '@monaco-editor/react'
import monaco from 'monaco-editor/esm/vs/editor/editor.api'
import { styled, css } from '@storybook/theming'
import { FaAngleRight } from '@react-icons/all-files/fa/FaAngleRight'
import { FaCopy } from '@react-icons/all-files/fa/FaCopy'
import { FaCheck } from '@react-icons/all-files/fa/FaCheck'
import copy from 'copy-to-clipboard'
import { Props } from 'jarle/lib/Provider'

const Wrapper = styled.div({
  width: '100%',
  overflow: 'hidden',
  borderRadius: '8px',
  border: '1px solid #eaeaea',
})

const LiveContent = styled.div({
  height: '100%',
  padding: '16px',
  overflow: 'auto',
})

const summaryBarCss = css`
  color: #666;
  font-size: 14px;
  height: 42px;
  background: #f5f5f5;
  border-bottom: 1px solid #eaeaea;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  > div {
    display: flex;
    align-items: center;
  }
  .icon-btn {
    padding: 4px;
    cursor: pointer;
    margin-right: 8px;
    transition: all 0.2s ease;
    &:hover {
      color: #333;
    }
  }
  &.open {
    .icon-btn.open-btn {
      transform: rotate(90deg);
    }
  }

  .copy-result-text {
    color: limegreen;
    margin-right: 8px;
    font-size: 12px;
  }
`

const SummaryBar = styled.div`
  ${summaryBarCss}
`

const editorContentCss = css`
  max-height: 600px;
  overflow: hidden;
`

const EditorContent = styled.div`
  ${editorContentCss}
`

interface PlaygroundProps<TScope extends Record<string, unknown>> {
  code: string
  defaultExpanded?: boolean
  scope?: TScope
  providerProps?: Partial<Props<TScope>>
  editorProps?: Partial<EditorProps>
  className?: string
}

const Playground: React.FC<PlaygroundProps<never>> = ({
  code,
  defaultExpanded = false,
  scope,
  providerProps,
  editorProps,
  className,
}) => {
  const editorRef = React.useRef<monaco.editor.IStandaloneCodeEditor>()
  const [_code, setCode] = useState(code)
  const [open, setOpen] = useState(defaultExpanded)
  const [copied, setCopied] = useState(false)
  const [editorContentHeight, setEditorContentHeight] = useState(0)

  const onCopy = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    copy(_code)
    setCopied(true)
  }, [])

  const onCodeChange = useCallback((newCode: string) => {
    setCode(newCode)
  }, [])

  const onMount = useCallback<OnMount>((editor) => {
    editorRef.current = editor
    editor.onDidContentSizeChange((e) => {
      setEditorContentHeight(e.contentHeight)
      editor.layout()
    })
  }, [])

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false)
      }, 1000)
    }
  }, [copied])

  useEffect(() => {
    if (open) {
      if (editorContentHeight === 0) {
        setEditorContentHeight(editorRef.current?.getContentHeight())
      }
    } else {
      setEditorContentHeight(0)
    }
  }, [open, editorContentHeight])

  return (
    <Wrapper className={className}>
      <LiveContent>
        <Provider scope={scope} {...providerProps} code={_code}>
          <Preview />
          <Error />
        </Provider>
      </LiveContent>
      <SummaryBar className={open ? 'open' : ''}>
        <div>
          <FaAngleRight
            className="icon-btn open-btn"
            onClick={() => setOpen((state) => !state)}
          />
          <span>Editor</span>
        </div>
        <div>
          {copied && (
            <span className="copy-result-text">
              Copied
              <FaCheck />
            </span>
          )}
          <FaCopy className="icon-btn" title="copy" onClick={onCopy} />
        </div>
      </SummaryBar>
      <EditorContent
        className={open ? 'open' : ''}
        style={{ height: editorContentHeight }}
      >
        <MonacoEditor
          width="100%"
          language="javascript"
          theme="vs-dark"
          options={{
            fontSize: 16,
            scrollBeyondLastLine: false,
            minimap: {
              enabled: false,
            },
          }}
          {...editorProps}
          value={_code}
          onChange={onCodeChange}
          onMount={onMount}
        />
      </EditorContent>
    </Wrapper>
  )
}

export default Playground
