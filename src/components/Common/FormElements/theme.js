import { createMuiTheme } from '@material-ui/core/styles';

const themeObj = {
  typography: {
    fontFamily: '"Roboto", sans-serif',
  },
  palette: {
    primary: {
      light: '#ff0000',
      main: '#00bcd5',
      dark: '#00bcd5',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff4081',
      main: '#f50057',
      dark: '#c51162',
      contrastText: '#fff',
    },
  },
  overrides: {
    MuiCircularProgress: {
      root: {
        zIndex: 3,
      },
    },
    MuiInput: {
      root: {
        display: 'block',
      },
      input: {
        color: '#51505d',
        width: '93%',
        padding: '4px 0 7px',
      },
      underline: {
        '&:before': { borderColor: '#dfe0e3 !important' },
        '&:hover:not($disabled):before': {
          borderColor: '#dfe0e3 !important',
        },
        '&:after': {
          transform: 'scaleX(0)',
          borderColor: '#00bcd5 !important',
          height: 2,
        },
      },
      disabled: {
        '&:after': {
          borderBottom: '1px dashed #cdced1 !important',
        },
      },
      error: {
        '&:after': {
          borderColor: '#f44336 !important',
        },
      },
    },
    MuiButton: {
      root: {
        background: '#00bcd5',
        borderRadius: 3,
        border: 0,
        color: '#fff',
        height: 48,
        boxShadow: '0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)',
        '&:hover': {
          backgroundColor: '#0194a8 ',
        },
        a: {
          color: 'red',
        },
      },
      disabled: {
        background: '#0194a8 !important',
      },
    },
    MuiFormControl: {
      root: {
        display: 'flex',
        textAlign: 'left',
      },
    },
    MuiFormLabel: {
      root: {
        color: '#51505d',
        font: ' 300 16px Roboto,sans-serif',
        padding: '0',
        lineHeight: 'normal',
      },
      /* focused: {
        color: '#00bcd5 !important',
      },
      error: {
        color: '#f44336 !important',
      }, */
      disabled: {
        color: '#cdced1 !important',
      },
    },
    MuiInputLabel: {
      shrink: {
        font: ' 300 18px/18px Roboto,sans-serif',
        color: '#95959d',
      },
    },
    MuiChip: {
      root: {
        margin: '0 5px 5px 0',
      },
    },
    MuiPaper: {
      root: {
        background: '#f1f1f2',
      },
    },
    MuiTouchRipple: {
      child: {
        backgroundColor: '#83E1ED',
      },
    },
  },
};

const theme = createMuiTheme(themeObj);

const msiteProfileCreationFormTheme = createMuiTheme({
  ...themeObj,
  overrides: {
    ...themeObj.overrides,
    MuiButton: {
      ...themeObj.overrides.MuiButton,
      root: {
        ...themeObj.overrides.MuiButton.root,
        '&:hover': {
          background: '#00bcd5 !important',
        },
      },
    },
  },
});

const tabCapsuleTheme = createMuiTheme({
  ...themeObj,
  overrides: {
    ...themeObj.overrides,
    MuiButton: {
      ...themeObj.overrides.MuiButton,
      root: {
        ...themeObj.overrides.MuiButton.root,
        '&:hover': {
          background: '#fff !important',
        },
      },
    },
  },
});

const theme2 = createMuiTheme({
  ...theme,
  singleDropdown: {
    // Use the system font over Roboto.
    font: '300 12px Roboto,sans-serif',
    padding: '5px 10px',
  },
  overrides: {
    MuiButton: {
      root: {
        background: 'red',
        [theme.breakpoints.down('md')]: {
          background: '#95959d',
        },
        '&:hover': {
          background: '#00bcd5 !important',
        },
      },
    },
  },
});

const drawerTextFieldObj = { ...themeObj };

drawerTextFieldObj.overrides.MuiInput.disabled = {
  '&:before': {
    border: 'none !important',
    backgroundImage: 'linear-gradient(to right, rgb(205, 206, 209) 54%, rgb(255, 255, 255) 0%) !important',
    backgroundPosition: 'bottom !important',
    backgroundSize: '13px 1px !important',
    backgroundRepeat: 'repeat-x !important',
  },
};

drawerTextFieldObj.overrides.MuiFormLabel.focused = {
  color: '#51505d !important',
};

drawerTextFieldObj.overrides.MuiFormLabel.root = {
  color: '#51505d',
  font: ' 300 16px Roboto,sans-serif',
  padding: '0',
  display: 'block',
};

drawerTextFieldObj.overrides.MuiInputLabel = {
  shrink: {
    font: '300 18px/18px Roboto,sans-serif',
    color: '#95959d',
    width: '112%',
  },
};

const drawerTextField = createMuiTheme(drawerTextFieldObj);

const drawerFieldThemeObj = {
  overrides: {
    MuiChip: themeObj.overrides.MuiChip,
    MuiInput: {
      root: {
        flexWrap: 'wrap',
      },
    },
  },
};

const drawerFieldTheme = createMuiTheme(drawerFieldThemeObj);

const drawerThemeObj = { ...themeObj };

drawerThemeObj.overrides.MuiModal = {
  root: {
    position: 'absolute',
  },
};

drawerThemeObj.overrides.MuiBackdrop = {
  root: {
    height: '100vh',
  },
};

drawerThemeObj.overrides.MuiMenuItem = {
  selected: {
    backgroundColor: '#83E1ED !important',
  },
};

drawerThemeObj.overrides.MuiListItem = {
  button: {
    '&:hover': {
      backgroundColor: '',
    },
  },
};

const drawerTheme = createMuiTheme(drawerThemeObj);

export { theme, theme2, drawerTextField, drawerFieldTheme, drawerTheme, msiteProfileCreationFormTheme, tabCapsuleTheme };
