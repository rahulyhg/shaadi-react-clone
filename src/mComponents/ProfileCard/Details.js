import React from 'react';
import PropTypes from '../../PropTypes';
import { DetailWrapper, DetailButton, DetailIcon, Name, Details, Detail, DetailColumn } from './styles';

class DetailsComponent extends React.Component { //eslint-disable-line
  onAction = key => event => {
    event.stopPropagation();
    this.props.onAction(key);
  };

  render() {
    const { name, hisHer, detailList, lastOnlineText, showInterest } = this.props;
    if (!detailList.length) {
      return null;
    }

    return (
      <DetailWrapper>
        <Details>
          <DetailColumn>
            <Name>{name}</Name>
          </DetailColumn>
          <DetailColumn>
            <DetailButton no-pan="true" onClick={this.onAction('chatNow')}>
              <DetailIcon no-pan="true" kind={lastOnlineText === 'Online' ? 'OnlineConversations@2x' : 'ic_chat_idel'} />
              {lastOnlineText}
            </DetailButton>
            {showInterest && (
              <DetailButton no-pan="true" onClick={this.onAction('showCommonInterests')}>
                <DetailIcon no-pan="true" kind="youAndHer@2x" />
                You &amp; {hisHer}
              </DetailButton>
            )}
          </DetailColumn>
        </Details>
        <Details>
          <DetailColumn>
            {detailList[0] && <Detail>{detailList[0].value}</Detail>}
            {detailList[1] && <Detail>{detailList[1].value}</Detail>}
          </DetailColumn>
          <DetailColumn>
            {detailList[2] && <Detail>{detailList[2].value}</Detail>}
            {detailList[3] && <Detail>{detailList[3].value}</Detail>}
          </DetailColumn>
        </Details>
      </DetailWrapper>
    );
  }
}

DetailsComponent.defaultProps = {
  showInterest: false,
};

DetailsComponent.propTypes = {
  name: PropTypes.string.isRequired,
  hisHer: PropTypes.string.isRequired,
  lastOnlineText: PropTypes.string.isRequired,
  detailList: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onAction: PropTypes.func.isRequired,
  showInterest: PropTypes.bool,
};

export default DetailsComponent;
