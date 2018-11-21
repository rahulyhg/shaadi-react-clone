import React from 'react';
import PropTypes from '../../PropTypes';
import s from './styles';

class YouAndMeConversationStarter extends React.PureComponent {
  state = {
    isDetailsVisible: false,
  };

  onMouseEnter = () => this.setState({ isDetailsVisible: true });
  onMouseLeave = () => this.setState({ isDetailsVisible: false });

  render() {
    const { displayData = [], himHer } = this.props;
    const { isDetailsVisible } = this.state;

    return displayData.length ? (
      <s.ChecklistItemWrapper onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
        <s.YouAndMeIcon />
        <s.YouAndMeText> You & {himHer}</s.YouAndMeText>
        <s.ChecklistBoxYouAndMe isVisible={isDetailsVisible}>
          <s.BoxPointerTop />
          {displayData.map((item, index) => {
            const eachKey = `info-${index}`;
            return (
              <s.VerifiedText key={eachKey}>
                <s.VerifiedTick />
                {item}
              </s.VerifiedText>
            );
          })}
        </s.ChecklistBoxYouAndMe>
      </s.ChecklistItemWrapper>
    ) : (
      ''
    );
  }
}

YouAndMeConversationStarter.propTypes = {
  displayData: PropTypes.arrayOf(PropTypes.string).isRequired,
  himHer: PropTypes.string.isRequired,
};

export default YouAndMeConversationStarter;
