import React from 'react'
import { addons, types } from '@storybook/addons'
import { AddonPanel } from '@storybook/components'
import LiveEditor from './components/LiveEditor'

addons.register('storybook/react-live-edit', (api) => {
  addons.addPanel('storybook/react-live-edit/panel', {
    type: types.PANEL,
    title: 'Live Edit',
    render: ({ active, key }) => {
      const storyData = api.getCurrentStoryData()
      const show = !!(storyData?.parameters?.liveEdit?.showEditor)
      return (
        <AddonPanel active={show && active} key={key}>
          <LiveEditor channel={addons.getChannel()} />
        </AddonPanel>
      )
    },
  })
})
