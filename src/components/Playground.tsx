import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Provider, Preview, Error } from 'jarle'
import MonacoEditor, {
  BeforeMount,
  EditorProps,
  OnMount,
} from '@monaco-editor/react'
import type monaco from 'monaco-editor/esm/vs/editor/editor.api'
import { styled, css } from '@storybook/theming'
import { FaAngleRight } from '@react-icons/all-files/fa/FaAngleRight'
import { FaCopy } from '@react-icons/all-files/fa/FaCopy'
import { FaCheck } from '@react-icons/all-files/fa/FaCheck'
import copy from 'copy-to-clipboard'
import { Props } from 'jarle/lib/Provider'
import { AutoTypings } from '@hirohe/monaco-editor-auto-typings'
import { v4 as uuid } from 'uuid'
import EditorWrapper from './EditorWrapper'
import applyJsxHighlighter from '../utils/apply-jsx-highlighter'
import { defaultEditorOptions } from '../constants'

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
    box-sizing: content-box;
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
  max-height: 1000px;
  overflow: hidden;
`

const EditorContent = styled.div`
  ${editorContentCss}
`

interface PlaygroundProps<TScope extends Record<string, unknown>> {
  // code text to render
  code: string
  // expand editor content by default
  defaultExpanded?: boolean
  // prop of Jarle Preview, for global scope injection
  scope?: TScope
  // props for Jarle Provider
  providerProps?: Partial<Props<TScope>>
  // enable auto typings resolve feature
  autoTypings?: boolean
  // provide custom type definitions for certain package
  resolveTypeDefinition?: (
    packageName: string
  ) => Promise<string | undefined> | string | undefined
  // props for MonacoEditor
  editorProps?: Partial<EditorProps>
  // root container's classname
  className?: string
  // preview's classname
  previewClassName?: string
  // preview's style
  previewStyle?: React.CSSProperties
  // editor's classname
  editorClassName?: string
  // editor's style
  editorStyle?: React.CSSProperties
}

const Playground: React.FC<PlaygroundProps<Record<string, unknown>>> = ({
  code,
  autoTypings = false,
  defaultExpanded = false,
  scope,
  providerProps,
  resolveTypeDefinition,
  editorProps,
  className,
  previewClassName,
  previewStyle,
  editorClassName,
  editorStyle,
}) => {
  const editorRef = React.useRef<monaco.editor.IStandaloneCodeEditor>()
  const monacoRef = React.useRef<typeof monaco>()
  const [_code, setCode] = useState(code)
  const [open, setOpen] = useState(defaultExpanded)
  const [copied, setCopied] = useState(false)
  const [editorContentHeight, setEditorContentHeight] = useState(0)

  // https://github.com/suren-atoyan/monaco-react/issues/354
  const filenameRef = React.useRef<string>(`main-${uuid()}.tsx`)

  const onCopy = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    copy(_code)
    setCopied(true)
  }, [])

  const onCodeChange = useCallback((newCode: string) => {
    setCode(newCode)
  }, [])

  const monacoConfiguration = useCallback(() => {
    const _monaco = monacoRef.current
    if (_monaco) {
      // jsx and tsx syntax config
      _monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        ..._monaco.languages.typescript.typescriptDefaults.getCompilerOptions(),
        target: _monaco.languages.typescript.ScriptTarget.Latest,
        jsx: _monaco.languages.typescript.JsxEmit.Preserve,
      })
      if (autoTypings) {
        _monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
          noSemanticValidation: false,
          noSyntaxValidation: false,
        })
      } else {
        _monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
          noSemanticValidation: true,
          noSyntaxValidation: true,
        })
      }
    }
  }, [autoTypings])

  const beforeMount = useCallback<BeforeMount>((_monaco) => {
    monacoRef.current = _monaco
    monacoConfiguration()
  }, [])

  const onMount = useCallback<OnMount>(
    (editor, _monaco) => {
      editorRef.current = editor

      // sometimes onDidContentSizeChange will not trigger on initial load,
      // if defaultExpanded needed, update the height manually.
      if (defaultExpanded) setEditorContentHeight(editor.getContentHeight())

      editor.onDidContentSizeChange((e) => {
        setEditorContentHeight((height) => {
          if (!defaultExpanded) {
            // when not defaultExpanded, update the height only if it is opened
            return height !== 0 ? e.contentHeight : height
          } else {
            return e.contentHeight
          }
        })
        editor.layout()
      })

      if (autoTypings) {
        const autoTypings = AutoTypings.create(editor, {
          monaco: _monaco,
          resolveTypeDefinition,
        })
        // preload type definitions of React, and global variables definitions provided by Jarle
        autoTypings
          .resolvePackage({
            kind: 'package',
            packageName: 'react',
            importPath: '',
          })
          .then(() => {
            _monaco.languages.typescript.typescriptDefaults.addExtraLib(
              `
            declare global {
              const React: typeof React;
              const useState: typeof React.useState;
              const useEffect: typeof React.useEffect;
              const useRef: typeof React.useRef;
              const useCallback: typeof React.useCallback;
              const useMemo: typeof React.useMemo;
              const useContext: typeof React.useContext;
              const useReducer: typeof React.useReducer;
              const useImperativeHandle: typeof React.useImperativeHandle;
              const useLayoutEffect: typeof React.useLayoutEffect;
              const useDebugValue: typeof React.useDebugValue;
              
              const render: (element: React.ReactNode) => void;
            }
            
            export {};
          `,
              'inmemory://model/global.d.ts'
            )
          })
      }

      applyJsxHighlighter(_monaco, editor)
    },
    [defaultExpanded, autoTypings, resolveTypeDefinition]
  )

  useEffect(() => {
    editorRef.current?.layout()
  }, [editorContentHeight])

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [copied])

  useEffect(() => {
    if (open) {
      // update height if the editor is ready
      if (editorRef.current) {
        setEditorContentHeight(
          (height) => editorRef.current?.getContentHeight() || height
        )
      }
    } else {
      setEditorContentHeight(0)
    }
  }, [open])

  const defaultLanguage = useMemo(() => {
    return autoTypings ? 'typescript' : 'javascript'
  }, [autoTypings])

  return (
    <Wrapper className={className}>
      <LiveContent style={previewStyle} className={previewClassName}>
        <Provider
          language="typescript"
          scope={scope}
          {...providerProps}
          code={_code}
        >
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
          <span>Code Editor</span>
        </div>
        <div>
          {copied && (
            <span className="copy-result-text">
              Copied !
              <FaCheck />
            </span>
          )}
          <FaCopy className="icon-btn" title="Copy the code" onClick={onCopy} />
        </div>
      </SummaryBar>
      <EditorContent
        className={open ? 'open' : ''}
        style={{ minHeight: editorContentHeight, position: 'relative' }}
      >
        <EditorWrapper style={editorStyle} className={editorClassName}>
          <MonacoEditor
            width="100%"
            theme="vs-dark"
            language={defaultLanguage}
            options={defaultEditorOptions}
            {...editorProps}
            path={`inmemory://model/${filenameRef.current}`}
            value={_code}
            onChange={onCodeChange}
            beforeMount={beforeMount}
            onMount={onMount}
          />
        </EditorWrapper>
      </EditorContent>
    </Wrapper>
  )
}

export default Playground
