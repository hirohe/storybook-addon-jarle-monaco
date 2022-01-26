import { LivePreviewProps } from './components/LivePreview'

export interface LiveEditConfig extends Omit<LivePreviewProps, 'channel'  | 'code'> {
  // show the live edit panel or not
  showEditor?: boolean
  // wrap the story with LivePreview decorator or not
  withLiveDecorator?: boolean
}
