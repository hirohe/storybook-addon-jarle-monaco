import React, { useEffect, useState } from 'react'
import { LiveProvider, LivePreview } from 'react-live'
import { event } from '../constants'

function Live({ code, channel, scope }) {
  const [_code, setCode] = useState(code)

  useEffect(() => {
    channel.emit(event.LoadSource, code)
    channel.on(event.UpdateSource, (code) => {
      setCode(code)
    })

    return () => {
      channel.removeListener(event.UpdateSource)
    }
  }, [])

  return (
    <LiveProvider code={_code} scope={scope}>
      <LivePreview />
    </LiveProvider>
  )
}

export default Live
