import PropTypes from 'prop-types';
import React from 'react';
import s from './styles';

const Table = ({ children, ...props }) => <s.Table {...props}>{children}</s.Table>;

Table.propTypes = {
  children: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string]).isRequired).isRequired,
};

export default Table;

Table.Row = ({ children, ...props }) => <s.Row {...props}>{children}</s.Row>;

Table.Row.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};

Table.Column = ({ children, ...props }) => <s.Column {...props}>{children}</s.Column>;

Table.Column.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string]).isRequired,
};
