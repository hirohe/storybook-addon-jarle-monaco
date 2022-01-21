import React, { useCallback, useEffect, useState } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { event } from '../constants';
function LiveEditor({ storyId, channel }) {
    const [code, setCode] = useState('');
    const loadSource = useCallback((val) => {
        setCode(val);
    }, []);
    const onChange = useCallback((val) => {
        channel.emit(`${event.UpdateSource}`, val);
    }, []);
    function onMount(editor, monaco) {
        // monaco.languages.typescript.javascriptDefaults.addExtraLib(pupuDecaration.default)
    }
    useEffect(() => {
        channel.on(event.LoadSource, loadSource);
        return () => {
            channel.removeListener(event.LoadSource, loadSource);
        };
    }, []);
    return (React.createElement(MonacoEditor, { height: "100%", language: "javascript", theme: "vs-dark", value: code, onChange: onChange, onMount: onMount }));
}
export default LiveEditor;
