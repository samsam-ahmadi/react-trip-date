import * as React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withA11y } from '@storybook/addon-a11y';
import { withConsole } from '@storybook/addon-console';
import { ThemeProvider } from 'styled-components';
import theme from '../src/utils/theme';

import Box from '../src/layouts/box';

addDecorator(withKnobs);
addDecorator(withA11y);
addDecorator((storyFn, context) => withConsole()(storyFn)(context));
addDecorator(story => (
  <ThemeProvider theme={theme}>
    <Box
      justifyContent="center"
      style={{
        padding: 25,
        backgroundColor: '#fff',
      }}
    >
      <div
        style={{
          width: '100%',
        }}
      >
        {story()}
      </div>
    </Box>
  </ThemeProvider>
));

const req = require.context('../src', true, /.stories.tsx$/);
function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
