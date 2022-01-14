import React from 'react'
import { addons, types } from '@storybook/addons'
import { AddonPanel } from '@storybook/components'
import LiveEditor from './components/LiveEditor'

addons.register('storybook/react-live', (api) => {
  addons.addPanel('storybook/react-live/panel', {
    type: types.PANEL,
    title: 'Live',
    render: ({ active, key }) => {
      return (
        <AddonPanel active={active} key={key}>
          <LiveEditor channel={addons.getChannel()} />
        </AddonPanel>
      )
    },
  })
})
