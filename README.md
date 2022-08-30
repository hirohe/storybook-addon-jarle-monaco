# storybook-addon-jarle-monaco

![version](https://badge.fury.io/js/storybook-addon-jarle-monaco.svg)

provide a live-editing editor and preview as storybook addon, it uses [jarle](https://github.com/jquense/jarle) and [monaco editor](https://github.com/suren-atoyan/monaco-react)

you could change code in editor and see the result in preview

## Example
```bash
yarn # install dependencies
yarn storybook # start storybook
```

## Demo [storybook page](https://hirohe.github.io/storybook-addon-jarle-monaco/?path=/story/example-liveedit-in-mdx--page)

## Usage

```bash
npm i --save-dev storybook-addon-jarle-monaco
# or
yarn add -D storybook-addon-jarle-monaco
```

Registry the addon to storybook
```js
module.exports = {
  // ...
  addons: [
    // ... other addons
    'storybook-addon-jarle-monaco',
  ],
}
```

### Use in stories

<img width="494" alt="image" src="https://user-images.githubusercontent.com/14357567/161434129-1efd80ef-9181-4cf5-9363-e49daec02dc7.png">

```jsx
// *.stories.jsx
import { generateLivePreviewStory } from 'storybook-addon-jarle-monaco'

// use generateLivePreviewStory HoC to generate live preview
export const LiveEdit = generateLivePreviewStory({
  code: `() => <Button primary label={foo} />`,
  scope: {
    Button,
    foo: 'bar',
  }
})

export const LiveEditUseLivePreview = () => (
  <LivePreview
    channel={addons.getChannel()}
    code={`<Button primary label={'hello'} />`}
    providerProps={{
      scope: {
        Button,
      }
    }}
  />
)

// use LivePreview alone, you need to set showEditor manually
LiveEditUseLivePreview.parameters = {
  liveEdit: {
    showEditor: true,
  }
}
```

### Use in MDX

<img width="1018" alt="image" src="https://user-images.githubusercontent.com/14357567/161434201-86d24055-8b0f-4a91-9336-2c460e6c1d33.png">

```mdx
import { Meta } from '@storybook/addon-docs';
import { Button } from './Button';
import { Playground } from '@pupu/storybook-addon-jarle-monaco';

<Meta title="Example/LiveEdit in MDX" />

> Use `Playground` in *.stories.mdx file, it provides live preview and editor

### Button

<Playground
  code="<Button primary label={'hello'} />"
  providerProps={{
    scope: {
      Button,
    },
  }}
/>
```

### Typescript typings resolve

Check the story [AutoTypings.stories.mdx](https://github.com/hirohe/storybook-addon-jarle-monaco/blob/main/stories/AutoTypings.stories.mdx)

<img width="1027" alt="image" src="https://user-images.githubusercontent.com/14357567/161434547-36ed5346-1805-4310-a335-7ae9a4a825d4.png">

<img width="606" alt="image" src="https://user-images.githubusercontent.com/14357567/161434629-91df26e4-eae1-4012-b3bf-21f2edf4ac13.png">

### With liveDecorator

1. add `liveDecorator` as global decorator
```js
import { liveDecorator } from 'storybook-addon-jarle-monaco'

// .storybook/preview.js
export const decorators = [
  liveDecorator
]
```
2. usage in stories
```jsx
// *.stories.jsx

// with liveDecorator will read the story's source code,
// so we can avoid writing live preview's code in plain text.
export const LiveEditWithLiveDecorator = () => <Button primary label="hello" />

// but you still need to provide scope or custom LivePreviewProps
LiveEditWithLiveDecorator.parameters = {
  liveEdit: {
    showEditor: true,
    withLiveDecorator: true,
    scope: {
      Button,
    }
  }
}
```

## Config

### Monaco files

this addon use `@monaco-editor/react`, [by default](https://github.com/suren-atoyan/monaco-react#loader-config) `monaco` files are being downloaded from `CDN`,
you can change the paths to use another CDN domain.

e.g.
```js
import { loader } from '@monaco-editor/react'

loader.config({ paths: { vs: 'https://cdn.bootcdn.net/ajax/libs/monaco-editor/0.33.0/min/vs' } })
```

### Story parameters

liveEdit config in story's parameters

| property          | type    | default | description                                      |
|-------------------|---------|---------|--------------------------------------------------|
| showEditor        | boolean | false   | show the live edit panel or not                  |
| withLiveDecorator | boolean | false   | wrap the story with LivePreview decorator or not |

### `Playground` Component

| property                  | type                                                                           | default | description                                                                                |
| --------------------- | ------------------------------------------------------------------------------ | ------ | ----------------------------------------------------------------------------------- |
| code                  | string                                                                         | --     | required, the code for live edit                                                                |
| autoTypings           | boolean                                                                        | false  | enable auto typings feature，if true, will set the language to typescript by default |
| defaultExpand         | boolean                                                                        | false  | expand the editor content                                                                  |
| scope                 | object                                                                         | --     | prop of Jarle Preview, for global scope injection                                     |
| providerProps         | [ProviderProps](https://jquense.github.io/jarle/#provider)                     | --     | props for Jarle Provider                                        |
| resolveTypeDefinition | (packageName: string) => Promise<string &#124; null> &#124; string &#124; null | --     | provide custom type definitions for certain package                       |
| editorProps           | Partial&lt;EditorProps&gt;                                                     | --     | props for MonacoEditor                                                        |
| className             | string                                                                         | --     | class for wrapper                                                                     |


you can add Jarle's Provider props in liveEdit, check the [Jarle's docs](https://jquense.github.io/jarle/) for more information.
