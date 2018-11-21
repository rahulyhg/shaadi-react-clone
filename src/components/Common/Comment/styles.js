import styled from 'styled-components';

const styles = {};

styles.Question = styled.div`
  color: #51505d;
  font: 300 18px/21px 'Roboto', sans-serif;
  padding: 12px 0 0;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

styles.CommentWrapper = styled.div`
  margin: 0 auto;
  width: 70%;
  position: absolute;
  left: 15%;
  bottom: 13%;
`;
styles.CharacterText = styled.div`
  color: #95959d;
  font: 300 11px 'Roboto', sans-serif;
  padding: 4px 0 0;
  text-align: right;
`;

styles.CharacterText = styled.div`
  color: #95959d;
  font: 300 11px 'Roboto', sans-serif;
  padding: 4px 0 0;
  text-align: right;
`;

export default styles;
