import { css } from '@storybook/theming'

// https://github.com/luminaxster/syntax-highlighter/blob/master/src/styles/MonacoJSXHighlighter.css
const jsxSyntaxStyle = css`
  .JSXElement.JSXBracket,
  .JSXOpeningElement.JSXBracket,
  .JSXClosingElement.JSXBracket,
  .JSXSpreadChild.JSXBracket,
  .JSXSpreadAttribute.JSXBracket {
    color: rgb(135, 135, 135);
  }

  .JSXExpressionContainer.JSXBracket {
    color: rgb(46, 140, 210);
  }

  .JSXElement.JSXIdentifier,
  .JSXOpeningElement.JSXIdentifier,
  .JSXClosingElement.JSXIdentifier {
    color: rgb(25, 196, 160);
  }

  .JSXElement.JSXText {
    color: rgb(210, 210, 210);
  }

  .JSXAttribute.JSXIdentifier {
    color: rgb(120, 215, 255);
  }
`

export default jsxSyntaxStyle
