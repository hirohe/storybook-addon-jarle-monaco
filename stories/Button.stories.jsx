import React from 'react';
import addons from '@storybook/addons';

import { Button } from './Button';
import { generateLivePreviewStory, LivePreview } from '../src'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

export const LiveEdit = generateLivePreviewStory({
  code: `() => <Button primary label={foo} />`,
  scope: {
    Button,
    foo: 'bar',
  }
})

export const Primary = () => (
  <Button primary label="Primary" />
);

export const LiveEdit2 = () => (
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

LiveEdit2.parameters = {
  liveEdit: {
    show: true
  }
}
