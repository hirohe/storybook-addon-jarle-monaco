import React from 'react'
import LivePreview, { LivePreviewProps } from './components/LivePreview'
import addons from '@storybook/addons'

export {
  LivePreview
}

export function generateLivePreviewStory(props: Omit<LivePreviewProps, 'channel'>) {
  const Story = () => {
    return (
      <LivePreview channel={addons.getChannel()} {...props} />
    )
  }

  Story.parameters = {
    liveEdit: {
      show: true
    }
  }

  return Story
}
