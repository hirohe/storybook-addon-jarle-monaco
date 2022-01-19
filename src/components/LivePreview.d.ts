import { Channel } from '@storybook/channels'
import { Props } from 'jarle/lib/Provider'

interface LivePreviewProps<TScope extends {} = {}> {
  code: string
  channel: Channel
  providerProps?: Props<TScope>
}

export default function LivePreview<TScope>(props: LivePreviewProps<TScope>): JSX.Element
