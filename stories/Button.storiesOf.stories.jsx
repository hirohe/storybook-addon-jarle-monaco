import { storiesOf } from '@storybook/react';
import { generateLivePreviewStory } from '../src'
import { Button } from './Button'

const stories = storiesOf('Button storiesOf', module)

stories.add('demo 1', generateLivePreviewStory({
  code: `() => <Button primary label={label} />`,
  scope: {
    Button,
    label: 'hello',
  }
}), { liveEdit: { showEditor: true } })
