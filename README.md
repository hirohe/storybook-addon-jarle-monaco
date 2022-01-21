# storybook-addon-jarle-monaco

![version](https://badge.fury.io/js/storybook-addon-jarle-monaco.svg)

provide a live-editing editor and preview as storybook addon, it uses [jarle](https://github.com/jquense/jarle) and [monaco editor](https://github.com/suren-atoyan/monaco-react)

you could change code in editor and see the result in preview

## Example
```bash
yarn # install dependencies
yarn storybook # start storybook
```

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
    'storybook-addon-jarle-monaco/preset',
  ],
}
```

Use in stories
```jsx
// *.stories.jsx
import { generateLivePreviewStory } from 'storybook-addon-jarle-monaco'

export const LiveEdit = generateLivePreviewStory({
  code: `() => <Button primary label={foo} />`,
  scope: {
    Button,
    foo: 'bar',
  }
})
```
