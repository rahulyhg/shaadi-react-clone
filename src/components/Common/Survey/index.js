import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import PropTypes from '../../../PropTypes';
import { theme2 } from '../../Common/FormElements/theme';
import Button from '../../Common/FormElements/Button';
import s from './styles';
import ss from '../../Common/FormElements/Button/styles';
import MultiChoice from '../MultiChoice';
import StarRating from '../StarRating';
import Comment from '../Comment';
import { unique } from './utils';

class Survey extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      enableSubmit: false,
      layout: this.props.layout,
    };
  }

  componentWillReceiveProps(props) {
    this.setState({ enableSubmit: props.enableSubmit });
  }

  storeAnswers = answer => {
    let { answers } = this.state;
    if (answers.length === 0) {
      answers.push(answer);
    } else {
      for (let i = 0; i < answers.length; i += 1) {
        if (answers[i].id === answer.id) {
          answers[i] = answer;
        } else {
          answers.push(answer);
        }
      }
    }

    answers = unique(answers);

    this.setState({ answers });
    this.props.storeAnswers(answers);
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.submitForm(this.state.answers);
  };

  showQuestions = questions =>
    questions &&
    questions.length &&
    questions.sort((a, b) => a.display_order > b.display_order).map((key, index) => {
      if (key.type === 'multichoice' && key.show) {
        return <MultiChoice {...key} id={key.id} key={key.id} storeAnswers={this.storeAnswers} />;
      }
      if (key.type === 'rating' && key.show) {
        return <StarRating {...key} id={key.id} key={key.id} storeAnswers={this.storeAnswers} layout={this.state.layout} />;
      }
      if (key.type === 'textarea' && key.show) {
        return <Comment {...key} id={key.id} key={key.id} storeAnswers={this.storeAnswers} />;
      }
      return null;
    });

  render() {
    const { questions } = this.props || [];
    return (
      <form>
        {this.showQuestions(questions)}
        <MuiThemeProvider theme={theme2}>
          <s.CtaBtnWrp addMargin={this.state.enableSubmit}>
            <Button
              onClick={this.handleSubmit}
              defaultWrap={!this.state.enableSubmit ? ss.DisabledInputButton : ss.InputButton}
              layerBtn={'csat'}
              disabled={!this.state.enableSubmit}
            >
              Submit
            </Button>
          </s.CtaBtnWrp>
        </MuiThemeProvider>
      </form>
    );
  }
}

Survey.defaultProps = {
  layout: 'desktop',
};

Survey.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      display_order: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['multichoice', 'rating', 'textarea']).isRequired,
      title: PropTypes.string.isRequired,
      choices: PropTypes.object,
      placeHolder: PropTypes.string,
      show: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  storeAnswers: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
  enableSubmit: PropTypes.bool.isRequired,
  layout: PropTypes.string,
};

export default Survey;
