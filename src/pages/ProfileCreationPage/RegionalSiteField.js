import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import withContextConsumer from '../../components/Common/withContextConsumer';
import ResponsiveFormFieldWithOptions from '../../components/Common/FormElements/ResponsiveFormFieldWithOptions';
import communityDomains from '../../constants/list/communityDomains.json';
import CustomToolTip from '../../components/Common/CustomToolTip';
import ShowHide from '../../components/HOC/ShowHide';
import getOptGrp from '../../helpers/getOptGrp';
import isNative from '../../helpers/isNative';
import api from '../../api';
import s from './styles';

class RegionalSiteField extends PureComponent {
  state = {
    options: [],
    isLoading: true,
  };
  componentDidMount = () =>
    api.get('/lookup/domain', { params: this.params }).then(response =>
      this.setState({
        options: getOptGrp({
          ...response.data[0],
          ...response.data[1],
          frequentLabel: 'Recommended',
          otherLabel: 'Community Sites',
        }),
        isLoading: false,
      }),
    );
  get params() {
    return {
      draftMatrimonyDomain: this.props.motherTongue,
      motherTongue: this.props.motherTongue,
      listType: 'frequent',
    };
  }
  getOptionLabel = option => option.label || option.text;
  getOptionValue = option => option.options || option.id;
  get domainWiseMotherTongue() {
    return this.props.motherTongue === 'Malayalam' ? 'Malayalee' : this.props.motherTongue;
  }
  canShowRegionalFieldHint = () => {
    const recommendedSite = this.state.options.length && this.state.options[0].options[0].text;
    return recommendedSite === this.props.value && recommendedSite.indexOf(this.domainWiseMotherTongue) > -1;
  };
  isSelected = ({ option, value }) => option.label === value;
  mutateSelectedOption = ({ value: url, label: value }) => ({ value, url });
  render = () => (
    <Fragment>
      <s.herDietmain>
        <s.herDietWrap>
          <ResponsiveFormFieldWithOptions
            name="regionalSite"
            id="regionalSite"
            label="Choose a regional site"
            placeholder="Search here"
            maxLength={100}
            mutateSelectedOption={this.mutateSelectedOption}
            getOptionLabel={this.getOptionLabel}
            getOptionValue={this.getOptionValue}
            isSelected={this.isSelected}
            {...this.state}
            {...this.props}
          />
        </s.herDietWrap>
        <CustomToolTip id="tooltip-regional-site" tooltipMargin="0 0 5px">
          Community sites provide a custom match-making experience and may give you better results. Note: You will still have access to
          profiles across all our sites.
        </CustomToolTip>
      </s.herDietmain>
      <s.helperTextField isVisible={this.canShowRegionalFieldHint()}>
        Register here, for best {this.props.motherTongue} matches from Shaadi.com.
      </s.helperTextField>
    </Fragment>
  );
}

RegionalSiteField.propTypes = {
  motherTongue: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

const getContext = context => ({
  isVisible:
    (!context.multiLang || context.multiLang.litem !== 'true') &&
    !isNative(context.history.location.search) &&
    context.user.isIndian() &&
    communityDomains.includes(context.user.motherTongue),
  ...context.form.regionalSite,
  motherTongue: context.user.motherTongue,
  doOrDoes: context.user.doOrDoes,
  getHeOrSheOrYou: context.user.getHeOrSheOrYou,
  isValid: !!context.form.regionalSite.value && !context.form.regionalSite.canShowError,
  isRequired: true,
});

export default withContextConsumer({ contextToFetch: getContext })(ShowHide(RegionalSiteField));
