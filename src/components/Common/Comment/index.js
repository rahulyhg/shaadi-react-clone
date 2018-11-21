/* eslint-disable camelcase */
import React, { Fragment } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import PropTypes from '../../../PropTypes';
import { theme } from '../../Common/FormElements/theme';
import s from './styles';
import TextField from '../../Common/FormElements/TextField';

class Comment extends React.PureComponent {
  state = {
    comment: '',
  };

  onChange = event => {
    const comment = event.target.value;
    this.setState({ comment: comment.slice(0, 4000) });
    this.props.storeAnswers({ id: this.props.id, answer: comment });
  };

  render() {
    return (
      <Fragment>
        <MuiThemeProvider theme={theme}>
          <s.CommentWrapper>
            <s.Question>{this.props.title}</s.Question>
            <TextField
              multiline
              fullWidth
              rowsMax={2}
              value={this.state.comment}
              onChange={this.onChange}
              placeholder={this.props.placeHolder}
            />
            <s.CharacterText>Max 4000</s.CharacterText>
          </s.CommentWrapper>
        </MuiThemeProvider>
      </Fragment>
    );
  }
}

Comment.propTypes = {
  storeAnswers: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  placeHolder: PropTypes.string.isRequired,
};
export default Comment;
