import React, { useCallback, useEffect, useState } from 'react'
import { Provider, Preview, Error } from 'jarle'
import { event } from '../constants'
import { Channel } from '@storybook/addons'
import { Props } from 'jarle/lib/Provider'

export interface LivePreviewProps<TScope extends {} = {}> {
  code: string
  channel: Channel
  scope?: TScope
  providerProps?: Partial<Props<TScope>>
}

const LivePreview: React.FC<LivePreviewProps> = ({ code, channel, scope, providerProps = {} }) => {
  const [_code, setCode] = useState(code)

  const updateCode = useCallback((code) => {
    setCode(code)
  }, [])

  useEffect(() => {
    channel.emit(event.LoadSource, code)
    channel.on(event.UpdateSource, updateCode)

    return () => {
      channel.removeListener(event.UpdateSource, updateCode)
    }
  }, [updateCode])

  return (
    <Provider scope={scope} {...providerProps} code={_code}>
      <Preview />
      <Error />
    </Provider>
  )
}

export default LivePreview
