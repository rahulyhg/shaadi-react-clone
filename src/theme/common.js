import './common.css';
import './roboto.css';
import './react-joyride-compiled.css';
import './custom-components.css';
import './pure.css';
import './transitions.css';
import './slick.css';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    paddingTop: '100px',
  },
  main: {
    position: 'relative',
    zIndex: '1',
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '100%',
    height: '100%',
    flexWrap: 'nowrap',
    boxSizing: 'border-box',
  },
  mainStopPage: {
    position: 'relative',
    zIndex: '1',
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '100%',
    height: '100%',
    flexWrap: 'nowrap',
    boxSizing: 'border-box',
    paddingTop: '100px',
  },
  content: {
    position: 'relative',
    flex: 1,
  },
  contentWithDrawerClosed: {
    flexGrow: 1,
    width: '100%',
  },
  contentWithDrawerOpen: {
    flexGrow: 1,
    width: '100%',
    position: 'fixed',
    top: 0,
    left: '277px',
    overflow: 'hidden',
  },
  mobileContainer: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
    fontFamily: 'Roboto, sans-seif',
    fontWeight: 400,
    fontSmoothing: 'antialiased',
  },
};

export default styles;
