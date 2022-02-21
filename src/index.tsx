import React from 'react'
import LivePreview, { LivePreviewProps } from './components/LivePreview'
import Playground from './components/Playground'
import addons from '@storybook/addons'
import { Story } from '@storybook/api'
import { LiveEditConfig } from './types'

export { LivePreview, Playground }

/**
 * this is HoC that wraps the story with the LivePreview component
 * returned component will have liveEdit in parameters
 */
export function generateLivePreviewStory(
  props: Omit<LivePreviewProps, 'channel'>
) {
  const Story = () => {
    return <LivePreview {...props} channel={addons.getChannel()} />
  }

  Story.parameters = {
    liveEdit: {
      showEditor: true,
    },
  }

  return Story
}

const DefaultLiveEdit: LiveEditConfig = {
  showEditor: false,
  withLiveDecorator: false,
  scope: {},
}

/**
 * this storybook decorator is used to replace the story with a live preview.
 * this decorator will read the story's source code, so we can avoid writing live preview's code in plain text.
 * but you still need to provide scope or custom {@see LivePreviewProps} via liveEdit in the story's parameters.
 */
export function liveDecorator(Story: any, storyData: Story) {
  const liveEdit =
    (storyData.parameters?.liveEdit as LiveEditConfig) || DefaultLiveEdit
  const { showEditor, withLiveDecorator, ...livePreviewProps } = liveEdit
  if (!withLiveDecorator) return <Story />

  return (
    <LivePreview
      {...livePreviewProps}
      channel={addons.getChannel()}
      code={storyData.parameters?.storySource?.source || ''}
    />
  )
}
