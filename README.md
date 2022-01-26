# storybook-addon-jarle-monaco

![version](https://badge.fury.io/js/storybook-addon-jarle-monaco.svg)

provide a live-editing editor and preview as storybook addon, it uses [jarle](https://github.com/jquense/jarle) and [monaco editor](https://github.com/suren-atoyan/monaco-react)

you could change code in editor and see the result in preview

## Example
```bash
yarn # install dependencies
yarn storybook # start storybook
```

[storybook page](https://hirohe.github.io/storybook-addon-jarle-monaco/?path=/story/example-introduction--page)

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

check the [Jarle's docs](https://jquense.github.io/jarle/) for more information
