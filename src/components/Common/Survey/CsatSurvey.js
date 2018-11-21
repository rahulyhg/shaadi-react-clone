import React, { Fragment } from 'react';
import { parse } from 'qs';
import PropTypes from '../../../PropTypes';
import s from './styles';
import Survey from './index';
import SvgLoader from '../SvgLoader';
import ThankyouMsg from './ThankyouMsg';
import { unique } from './utils';

class CsatSurvey extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      answers: [],
      formSubmit: false,
      questions: [],
      enableSubmit: false,
    };
  }

  componentDidMount() {
    this.props.doCsatSurvey('Csat Survey Stoppage', this.props.user.uid, 'getSurveyData');
  }

  componentWillReceiveProps(props) {
    this.setState({ questions: props.csatSurvey.questions });
  }

  questionsToDisplay = () => {
    const questionState = this.state.questions || [];
    const questions =
      (questionState.length > 0 &&
        questionState.map(question => {
          if (question.type === 'textarea') {
            // client's end logic defined by product
            question.show = this.state.answers.some(answer => answer.id === '3');
          } else question.show = true;
          return question;
        })) ||
      [];
    return questions;
  };

  storeAnswers = answer => {
    const answers = unique(answer);
    if (answers.some(ans => ans.id === '3')) {
      this.setState({ answers, enableSubmit: true });
    }
  };

  saveAnswers = answer => {
    const queryParams = parse(this.props.history.location.search.slice(1));
    this.setState({ formSubmit: true });
    this.props.doCsatSurvey('Csat Survey Stoppage', this.props.user.uid, 'postSurveyData', {
      questions: answer,
      sId: queryParams.sid,
      // sId: encode64(queryParams.sid),
    });
  };

  render() {
    const questions = this.questionsToDisplay();
    const layout = this.props.layout;
    return (
      <s.MainWrapper>
        <s.SubMainWrapper>
          <s.MainBgSurvey>
            {!this.state.formSubmit ? (
              (!this.props.csatSurvey.loading && (
                <Fragment>
                  <s.VerifyHeading>
                    <s.Bold weight={100}>We love to hear from you</s.Bold>
                  </s.VerifyHeading>
                  <Survey
                    questions={questions}
                    submitForm={this.saveAnswers}
                    storeAnswers={this.storeAnswers}
                    enableSubmit={this.state.enableSubmit}
                    layout={layout}
                  />
                </Fragment>
              )) || (
                <s.LoaderWrp>
                  <SvgLoader isVisible isBigLoader />
                </s.LoaderWrp>
              )
            ) : (
              <ThankyouMsg
                wwwBaseUrl={this.props.wwwBaseUrl}
                msg={['Thank you for your feedback.', <br />, 'You are helping us improve Shaadi.com.']}
              />
            )}
          </s.MainBgSurvey>
        </s.SubMainWrapper>
      </s.MainWrapper>
    );
  }
}
CsatSurvey.defaultProps = {
  layout: 'desktop',
};
CsatSurvey.propTypes = {
  csatSurvey: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    questions: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        display_order: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['multichoice', 'rating', 'textarea']).isRequired,
        title: PropTypes.string.isRequired,
        choices: PropTypes.object,
        placeHolder: PropTypes.string,
      }),
    ).isRequired,
  }).isRequired,
  doCsatSurvey: PropTypes.func.isRequired,
  wwwBaseUrl: PropTypes.string.isRequired,
  history: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
  user: PropTypes.shape(PropTypes.shaadiUser).isRequired,
  layout: PropTypes.string,
};

export default CsatSurvey;
