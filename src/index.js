import React from 'react';
import LivePreview from './components/LivePreview';
import addons from '@storybook/addons';
export { LivePreview };
export function generateLivePreviewStory(props) {
    const Story = () => {
        return (React.createElement(LivePreview, Object.assign({ channel: addons.getChannel() }, props)));
    };
    Story.parameters = {
        liveEdit: {
            show: true
        }
    };
    return Story;
}
