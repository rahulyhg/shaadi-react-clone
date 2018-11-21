/* eslint-disable prettier/prettier */
import { oppositeGender, himHer, interestedInHimHer, isValidGender } from '../profileUtils';

describe('Profile utils', () => {
  describe('isValidGender', () => {
    it('should return true for M or F', () => {
      expect(isValidGender('M')).toBeTruthy();
      expect(isValidGender('F')).toBeTruthy()
      expect(isValidGender('Anything Else')).toBeFalsy();
    });
  });

  describe('oppositeGender', () => {
    it('should return M for F and F for M', () => {
      expect(oppositeGender('M')).toBe('F');
      expect(oppositeGender('F')).toBe('M');
      expect(oppositeGender('Anything Else')).toBe('');
    });

    it('should return empty string for any empty values', () => {
      expect(oppositeGender('')).toBe('');
      expect(oppositeGender(null)).toBe('');
      expect(oppositeGender(undefined)).toBe('');
    });
  });

  describe('himHer', () => {
    it('should return M for F and F for M', () => {
      expect(himHer('M')).toBe('him');
      expect(himHer('F')).toBe('her');
      expect(himHer('Anything Else')).toBe('them');
    });

    it('should return them for any empty values', () => {
      expect(himHer('')).toBe('them');
      expect(himHer(null)).toBe('them');
      expect(himHer(undefined)).toBe('them');
    });
  });

  describe('interestedInHimHer', () => {
    it('should return M for F and F for M', () => {
      expect(interestedInHimHer('M')).toBe('her');
      expect(interestedInHimHer('F')).toBe('him');
      expect(interestedInHimHer('Anything Else')).toBe('them');
    });

    it('should return them for any empty values', () => {
      expect(interestedInHimHer('')).toBe('them');
      expect(interestedInHimHer(null)).toBe('them');
      expect(interestedInHimHer(undefined)).toBe('them');
    });
  });
});
