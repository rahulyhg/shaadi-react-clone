import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from '../PropTypes';
import theme from '../theme/common';

const Content = props =>
  props.ignoreContentWrap ? null : (
    <div className="CoreContent" style={theme.content}>
      {props.children}
    </div>
  );

Content.propTypes = {
  ignoreContentWrap: PropTypes.bool.isRequired,
  children: PropTypes.children.isRequired,
};

const selector = state => ({
  ignoreContentWrap: state.session.ignoreContentWrap,
});

export default withRouter(connect(selector)(Content));
