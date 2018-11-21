import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import PropTypes from './PropTypes';
import onAppInit from './actions/onAppInit';
import SvgLoader from './components/Common/SvgLoader';
import ContextProvider from './components/Common/Context';
import theme from './theme';
import getModulePageName from './reducers/session/getModulePageName';

const { Container } = theme;

class ShaadiApp extends PureComponent {
  componentDidMount() {
    onAppInit(this.props.history)(this.props.dispatch, this.props.getState);
    document.body.oncontextmenu = this.onContextMenu;
  }
  onContextMenu = () => getModulePageName().isProfileCreationPage && this.props.layout === 'mobile';
  render() {
    const { children, needMainPadding, layout, canShowLayerPartial, dispatch, history } = this.props;
    return layout ? (
      <ThemeProvider theme={{ needMainPadding, contentDisplay: getModulePageName().isProfileCreationPage && 'none' }}>
        <ContextProvider dispatch={dispatch} layout={layout} canShowLayerPartial={canShowLayerPartial} history={history}>
          <Container>{children}</Container>
        </ContextProvider>
      </ThemeProvider>
    ) : (
      <SvgLoader />
    );
  }
}

ShaadiApp.propTypes = {
  children: PropTypes.node.isRequired,
  history: PropTypes.shape(PropTypes.history).isRequired,
  dispatch: PropTypes.func.isRequired,
  getState: PropTypes.func.isRequired,
  layout: PropTypes.string.isRequired,
  needMainPadding: PropTypes.bool.isRequired,
  canShowLayerPartial: PropTypes.bool.isRequired,
};

export const mapStateToProps = ({ view, session }) => ({
  layout: view.layout || '',
  needMainPadding: session.needMainPadding,
  canShowLayerPartial: session.canShowLayerPartial,
});

export default withRouter(connect(mapStateToProps, {})(ShaadiApp));
