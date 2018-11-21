class Compare {
  constructor(valueToCompare) {
    if (typeof valueToCompare !== 'number') {
      throw new Error('Number (integer/float) expected by Compare Class');
    }
    this.valueToCompare = valueToCompare;
  }
  isGreaterThan(valueToCompareWith) {
    return this.valueToCompare > valueToCompareWith;
  }
  isGreaterThanOrEqualTo(valueToCompareWith) {
    return this.valueToCompare >= valueToCompareWith;
  }
  isLessThan(valueToCompareWith) {
    return this.valueToCompare < valueToCompareWith;
  }
  isLessThanOrEqualTo(valueToCompareWith) {
    return this.valueToCompare <= valueToCompareWith;
  }
  isEqualTo(valueToCompareWith) {
    return this.valueToCompare === valueToCompareWith;
  }
}

const compare = valueToCompare => new Compare(valueToCompare);

export default compare;
