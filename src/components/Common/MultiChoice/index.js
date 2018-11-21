import React from 'react';
import PropTypes from '../../../PropTypes';
import RadioTabGroup from '../../Common/FormElements/RadioTabGroup';
import s from './styles';

class MultiChoice extends React.PureComponent {
  state = {
    choices: [],
    render: 0,
  };

  onChipSelection = (event = {}, { value }) => {
    const valueToSet = value;
    const { choices } = this.state;
    const choiceExists = choices.some(obj => obj.id === valueToSet);
    // if choice already exists filter it out
    const newchoices = choiceExists ? choices.filter(item => item.id !== valueToSet) : choices;
    if (!newchoices.length || !choiceExists) {
      if (!choiceExists)
        newchoices.push({
          choiceMade: this.props.choices[valueToSet],
          id: valueToSet,
        });
    }
    // force component to render as setState is async
    this.setState({ choices: newchoices }, () => {
      this.setState(prevState => ({
        render: prevState.render + 1,
      }));
    });

    this.props.storeAnswers({ id: this.props.id, answer: newchoices.map(obj => obj.id) });
  };

  creatChoices = choices =>
    Object.keys(choices).map((i, index) => ({
      value: i,
      label: <React.Fragment>{choices[i]}</React.Fragment>,
    }));

  render() {
    const { choices, title } = this.props;

    const choicesArray = this.creatChoices(choices);

    const radioTabProps = {
      type: 'checkbox',
      value: this.state.choices,
      name: 'choices',
      options: choicesArray,
      onChange: this.onChipSelection,
      defaultWrap: s.radioTabWrapper,
    };

    return (
      <s.MutliChoiceWrapper>
        <s.Title>{title}</s.Title>
        <RadioTabGroup {...radioTabProps} />
      </s.MutliChoiceWrapper>
    );
  }
}

MultiChoice.defaultProps = {
  choices: {
    value: '',
    text: false,
  },
};

MultiChoice.propTypes = {
  storeAnswers: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  choices: PropTypes.shape({
    value: PropTypes.string,
    text: PropTypes.bool,
  }),
};

export default MultiChoice;
