import React from 'react'
import { addons, types } from '@storybook/addons'
import { AddonPanel } from '@storybook/components'
import { loader } from '@monaco-editor/react'
import LiveEditor from './components/LiveEditor'

const monacoPath = process.env.STORYBOOK_ADDON_MONACO_PATH || 'https://cdn.jsdelivr.net/npm/monaco-editor@0.33.0/min/vs'
loader.config({ paths: { vs: monacoPath } })

addons.register('storybook/react-live-edit', (api) => {
  addons.addPanel('storybook/react-live-edit/panel', {
    type: types.PANEL,
    title: 'Live Edit',
    render: ({ active, key }) => {
      const storyData = api.getCurrentStoryData()
      const show = !!storyData?.parameters?.liveEdit?.showEditor
      return (
        <AddonPanel active={show && active} key={key}>
          <LiveEditor channel={addons.getChannel()} />
        </AddonPanel>
      )
    },
  })
})
