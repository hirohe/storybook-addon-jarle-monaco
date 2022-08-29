import { styled } from '@storybook/theming'
import jsxSyntaxStyle from './jsx-syntax-style'

const EditorWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  ${jsxSyntaxStyle}
`

export default EditorWrapper
