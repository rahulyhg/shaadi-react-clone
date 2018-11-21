import React from 'react';
import Dialog from '@material-ui/core/Dialog';

/* eslint-disable react/prop-types */

const nonFullScreenModalStyle = {
  margin: '32px',
  maxHeight: '90vh',
};

const getDialogProps = props => ({
  ...props,
  PaperProps: {
    style: !(props.fullScreen || props.fullWidth) ? nonFullScreenModalStyle : {},
  },
});

export default props => <Dialog {...getDialogProps(props)} />;
