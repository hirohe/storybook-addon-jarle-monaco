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

Use in stories

![image](https://user-images.githubusercontent.com/14357567/154925600-770a8646-549a-4ff9-af8f-b8484e000c18.png)

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

Use in MDX

![image](https://user-images.githubusercontent.com/14357567/155446687-b549ee19-f897-4fcd-8671-010643e695d3.png)

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

With liveDecorator

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

liveEdit config in story's parameters

| property          | type    | default | description                                      |
|-------------------|---------|---------|--------------------------------------------------|
| showEditor        | boolean | false   | show the live edit panel or not                  |
| withLiveDecorator | boolean | false   | wrap the story with LivePreview decorator or not |

you can add Jarle's Provider props in liveEdit, check the [Jarle's docs](https://jquense.github.io/jarle/) for more information.
