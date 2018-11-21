import React from 'react';
import PropTypes from 'prop-types';
import { Provider as ReduxProvider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { Provider as FelaProvider, ThemeProvider } from 'react-fela';
import { createRenderer } from 'fela';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

import prefixer from 'fela-plugin-prefixer';
import fallbackValue from 'fela-plugin-fallback-value';

import store from '../../store';
import felaTheme from '../../theme/felaTheme';

const renderer = createRenderer({
  plugins: [prefixer(), fallbackValue()],
});

const muiTheme = createMuiTheme({
  palette: {
    primary: {
      light: '#ff8e8d',
      main: '#ff5a60',
      dark: '#c62036',
      contrastText: '#fff',
    },
    secondary: {
      light: '#62efff',
      main: '#00bcd5',
      dark: '#008ba4',
      contrastText: '#fff',
    },
  },
});

export default class MobileDecorator extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    return (
      <ReduxProvider store={store}>
        <Router>
          <MuiThemeProvider theme={muiTheme}>
            <FelaProvider renderer={renderer}>
              <ThemeProvider theme={felaTheme}>
                <div style={{ width: 420, fontFamily: 'sans-serif', overflow: 'hidden' }}>
                  {this.props.children}
                  <style>{`body { margin: 0; font-family: sans-serif; }.mui-fixed { position: static; }`}</style>
                </div>
              </ThemeProvider>
            </FelaProvider>
          </MuiThemeProvider>
        </Router>
      </ReduxProvider>
    );
  }
}
