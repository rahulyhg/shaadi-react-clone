import React from 'react';
import PropTypes from 'prop-types';
import ShowHide from '../../../HOC/ShowHide';
import s from './styles';

const Stepper = props => (
  <s.stepperWrap>
    <s.stepperUl>
      <s.stepperLi
        onClick={props.onClick(1)}
        isActive={props.isActiveStep === 1}
        isDisabled={false}
        status={props.isActiveStep === 1 ? 'isActive' : 'isCurrentActive'}
      >
        <s.link status={props.isActiveStep === 1 ? 'isActive' : props.completedStepNumber > 0 ? 'isCurrentActive' : ''} />
      </s.stepperLi>
      <s.stepperLine />
      <s.stepperLi
        onClick={props.onClick(2)}
        isActive={props.isActiveStep === 2}
        isDisabled={false}
        status={props.isActiveStep === 2 ? 'isActive' : 'isCurrentActive'}
      >
        <s.link status={props.isActiveStep === 2 ? 'isActive' : props.completedStepNumber > 1 ? 'isCurrentActive' : ''} />
      </s.stepperLi>
      <s.stepperLine />
      <s.stepperLi
        onClick={props.onClick(3)}
        isActive={props.isActiveStep === 3}
        status={props.isActiveStep === 3 ? 'isActive' : 'isCurrentActive'}
      >
        <s.link status={props.isActiveStep === 3 ? 'isActive' : props.completedStepNumber > 2 ? 'isCurrentActive' : ''} />
      </s.stepperLi>
      <s.stepperLine isDisabled={props.isActiveStep !== 4 && props.completedStepNumber < 3} />
      <s.stepperLi
        onClick={props.completedStepNumber >= 3 ? props.onClick(4) : undefined}
        isActive={props.isActiveStep === 4}
        status={props.isActiveStep === 4 ? 'isActive' : props.completedStepNumber > 2 ? 'isCurrentActive' : 'isDisabled'}
      >
        <s.link status={props.completedStepNumber >= 3 ? 'isActive' : 'isDisabled'} />
      </s.stepperLi>
    </s.stepperUl>
  </s.stepperWrap>
);

Stepper.defaultProps = {
  onClick() {},
};

Stepper.propTypes = {
  isActiveStep: PropTypes.number.isRequired,
  completedStepNumber: PropTypes.number.isRequired,
  onClick: PropTypes.func,
};

export default ShowHide(Stepper);
