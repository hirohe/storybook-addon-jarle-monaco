import React from 'react'
import lodash from 'lodash'
import { Button } from './Button'
import { Playground } from '../src'
import typeDefinitions from '!raw-loader!./types.d.ts'

export const Demo1 = () => {
  const code = `import lodash from 'lodash';
import { Button } from 'your-private-lib';

const data = [1, 2, 3, 4, 5];

// wrong param's type
lodash.slice({});

() => {
  const [list, setList] = useState<number[]>(data);
  
  const update = useCallback(() => {
    setList(lodash.shuffle(list));
  }, []);
  
  return (
    <div>
      <Button
        primary
        size="large"
        // size="big"
        label="Shuffle!"
        onClick={update}
      />
      <ul>
        {list.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
`

  return (
    <Playground
      autoTypings
      defaultExpanded
      code={code}
      providerProps={{
        resolveImports: async () => ({
          'your-private-lib': {
            __esModule: true,
            Button,
          },
          lodash,
        }),
      }}
      resolveTypeDefinition={(packageName) => {
        if (packageName === 'your-private-lib') {
          return typeDefinitions
        }
      }}
    />
  )
}

export const Demo1Wrapper = () => {
  const demo1Code = `import { Playground } from 'storybook-addon-jarle-monaco';
import lodash from 'lodash';
import { Button } from 'your-private-lib';
import typeDefinitions from '!raw-loader!your-private-lib/types.d.ts';

const Story = () => {
  const code = \`import lodash from 'lodash';
import { Button } from 'your-private-lib';

const data = [1, 2, 3, 4, 5];

// wrong param's type
lodash.slice({});

() => {
  const [list, setList] = useState<number[]>(data);
  
  const update = useCallback(() => {
    setList(lodash.shuffle(list));
  }, []);
  
  return (
    <div>
      <Button
        primary
        size="large"
        // size="big"
        label="Shuffle!"
        onClick={update}
      />
      <ul>
        {list.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
\`;

  return (
    <Playground
      autoTypings
      defaultExpanded
      code={code}
      providerProps={{
        resolveImports: async () => ({
          'your-private-lib': {
            __esModule: true,
            Button,
          },
          lodash,
        }),
      }}
      resolveTypeDefinition={(packageName) => {
        if (packageName === 'your-private-lib') {
          return typeDefinitions
        }
      }}
    />
  )
}

render(Story);
`

  return (
    <Playground
      autoTypings
      defaultExpanded
      code={demo1Code}
      providerProps={{
        resolveImports: async () => ({
          'storybook-addon-jarle-monaco': {
            __esModule: true,
            Playground,
          },
          'your-private-lib': {
            __esModule: true,
            Button,
          },
          '!raw-loader!your-private-lib/types.d.ts': typeDefinitions,
          lodash,
        }),
      }}
    />
  )
}
