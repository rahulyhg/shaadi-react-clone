import React from 'react';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    flex: '1',
  },
  loader: {
    position: 'fixed',
    top: '50%',
    margin: '-16px 0 0',
    height: '32px',
  },
};

const spinnerImg = require('./spinner.gif');

const Spinner = () => (
  <div style={styles.container}>
    <img style={styles.loader} alt="loading" src={spinnerImg} />
  </div>
);

export default Spinner;
