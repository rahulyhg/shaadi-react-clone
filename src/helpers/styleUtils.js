import { css } from 'styled-components';

export const composeMixins = (...mixins) => mixins.reduce((acc, m) => css`${acc}${m}`).filter(x => x !== ' ');
