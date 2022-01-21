import React, { useEffect, useState } from 'react';
import { Provider, Preview, Error } from 'jarle';
import { event } from '../constants';
function LivePreview({ code, channel, scope, providerProps }) {
    const [_code, setCode] = useState(code);
    useEffect(() => {
        channel.emit(event.LoadSource, code);
        channel.on(event.UpdateSource, (code) => {
            setCode(code);
        });
        return () => {
            channel.removeListener(event.UpdateSource);
        };
    }, []);
    return (React.createElement(Provider, Object.assign({ scope: scope }, providerProps, { code: _code }),
        React.createElement(Preview, null),
        React.createElement(Error, null)));
}
export default LivePreview;
