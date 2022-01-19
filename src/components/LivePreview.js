import React, { useEffect, useState } from 'react'
import { Provider, Preview, Error } from 'jarle'
import { event } from '../constants'

function LivePreview({ code, channel, providerProps }) {
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
    <Provider {...providerProps} code={_code}>
      <Preview />
      <Error />
    </Provider>
  )
}

export default LivePreview
