import React from 'react';
import addons from '@storybook/addons';

import { Button } from './Button';
import LivePreview from '../src/components/LivePreview';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => (
  <LivePreview
    channel={addons.getChannel()}
    code={`() => <Button primary label={foo} />`}
    providerProps={{
      Button,
      foo: 'bar',
    }}
  />
)

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  primary: true,
  label: 'Button',
};

