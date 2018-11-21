/* eslint-disable prettier/prettier */
import { compose } from 'redux';

// type Gender = ('M'|'F')?
// type HimHerPronoun = 'him'|'her'|'them'

// isValidGender :: Gender -> Boolean
export const isValidGender = g =>
  ['M','F'].indexOf(g) !== -1;

// himHer :: Gender -> HimHerPronoun
export const himHer = g =>
  isValidGender(g) ? (g === 'M' ? 'him' : 'her') : 'them';

// oppositeGender :: Gender -> Gender
export const oppositeGender = g =>
  isValidGender(g) ? (g === 'M' ? 'F' : 'M') : '';

// interestedInHimHer :: Gender -> HimHerPronoun
export const interestedInHimHer = compose(himHer, oppositeGender);
