import styled from 'styled-components';

const styles = {};

styles.ChatTabs = styled.div`
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  max-height: ${props => (props.isOpen ? '1500px' : '30px')};
  overflow: visible;

  > div {
    display: ${props => (props.isOpen ? '' : 'none')};
    width: 100%;
  }
`;

styles.Content = styled.div`
  flex: 1;
  overflow: auto;

  > div {
    display: none;
  }

  > div:nth-child(1) {
    display: ${props => (props.activeTab === 'alerts' ? 'block' : 'none')};
  }
  > div:nth-child(2) {
    display: ${props => (props.activeTab === 'chats' ? 'block' : 'none')};
  }
  > div:nth-child(3) {
    display: ${props => (props.activeTab === 'online' ? 'block' : 'none')};
  }
`;

styles.Popover = styled.section`
  display: ${props => (props.isVisible ? 'block' : 'none')};
  position: fixed;
  right: 245px;

  &:hover {
    display: block;
  }
`;

styles.PopoverIcon = styled.span`
  display: inline-block;
  margin-left: -10px;
  background-image: url(/assets/im-icon-sprite-ver6.png);
  background-position: left -106px;
  width: 10px;
  height: 20px;
  position: fixed;
  right: 245px;
  margin-top: -10px;
`;

export default styles;
