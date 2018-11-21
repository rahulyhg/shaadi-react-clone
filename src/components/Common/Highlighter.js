import React from 'react';
import PropTypes from '../../PropTypes';
import Wrapper from '../../theme/SpanWrapper';
import isIE from '../../helpers/deviceInfo/isIE';

const DefaultHighlightWrap = ({ isMatched, children }) => (
  <Wrapper backgroundColor="transparent" color="rgba(81, 80, 93, 0.87)" boldness={isMatched ? (isIE() ? 'bold' : 500) : 'inherit'}>
    {children}
  </Wrapper>
);

DefaultHighlightWrap.propTypes = {
  children: PropTypes.string.isRequired,
  isMatched: PropTypes.bool.isRequired,
};

class StringPrototype {
  constructor(str) {
    this.str = str;
  }
  matches = matchWith =>
    matchWith instanceof Array
      ? toLowerCaseArr(matchWith).includes(this.str.toLowerCase())
      : matchWith.toLowerCase() === this.str.toLowerCase();
  // Split on higlight term and include term into parts, ignore case
  getChunkedStringForHighlighting = higlight => {
    if (!higlight) {
      return [this.str];
    }
    const text = higlight instanceof Array ? higlight.join('|') : higlight;
    const escapedHighlight = text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // eslint-disable-next-line no-useless-escape
    const regexStr = `(${escapedHighlight})`;
    return this.str.split(new RegExp(regexStr, 'gi'));
  };
}

const StringPrototypeInstantiated = str => new StringPrototype(str);

const toLowerCaseArr = array => array.map(value => value.toLowerCase());

const Highlighter = ({ highlight, children: text, HighlightWrap }) => (
  <Wrapper>
    {StringPrototypeInstantiated(text)
      .getChunkedStringForHighlighting(highlight)
      .map((part, i) => (
        <HighlightWrap key={`${part}-${Math.random().toString(16)}`} isMatched={StringPrototypeInstantiated(part).matches(highlight)}>
          {part}
        </HighlightWrap>
      ))}
  </Wrapper>
);

Highlighter.defaultProps = {
  HighlightWrap: DefaultHighlightWrap,
  highlight: '',
};

Highlighter.propTypes = {
  children: PropTypes.string.isRequired,
  highlight: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).isRequired,
  HighlightWrap: PropTypes.oneOfType([PropTypes.node, PropTypes.func, PropTypes.element]).isRequired,
};

export default Highlighter;
