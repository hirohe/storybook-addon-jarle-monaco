import React from 'react'
import { Button } from './Button'
import { Playground } from '../src'
import Confetti from 'canvas-confetti'

export const Demo1 = ({ className }) => (
  <Playground
    defaultExpanded
    className={className}
    code="<Button primary label={'hello'} />"
    providerProps={{
      scope: {
        Button,
      },
    }}
  />
)

export const Demo2 = ({ className }) => (
  <Playground
    defaultExpanded
    className={className}
    code={`import Button from './Button';
import Confetti from 'canvas-confetti';

function cheer() {
  // left
  Confetti({
    particleCount: 30,
    angle: 60,
    spread: 55,
    origin: { x: 0 }
  })
  // right
  Confetti({
    particleCount: 30,
    angle: 120,
    spread: 55,
    origin: { x: 1 }
  })
}

() => <Button primary label={'Cheer !'} onClick={cheer} />
`}
    providerProps={{
      resolveImports: () => ({
        './Button': Button,
        'canvas-confetti': Confetti,
      })
    }}
  />
)
