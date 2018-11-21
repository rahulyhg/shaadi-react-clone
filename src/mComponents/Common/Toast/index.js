import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';

const Toast = props => {
  const { message } = props;
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={!!message}
      autoHideDuration={6000}
      style={{ position: 'sticky' }}
      SnackbarContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={<span id="message-id">{message}</span>}
      action={[]}
    />
  );
};
Toast.defaultProps = {
  message: null,
};
Toast.propTypes = {
  message: PropTypes.string,
};
export default Toast;
