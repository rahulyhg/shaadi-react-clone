import capitalize from './capitalize';

class Convert {
  heightUnits = ['cms', 'inches', 'feet'];
  constructor(valueToConvert, valueToConvertUnit) {
    this.valueToConvert = valueToConvert;
    this.valueToConvertUnit = valueToConvertUnit;
  }
  convertTo(convertToValue) {
    if (this.heightUnits.includes(this.valueToConvertUnit)) {
      switch (this.valueToConvertUnit) {
        case 'feet': {
          this.standardUnitValue = this.valueToConvert * 30.48;
          break;
        }
        case 'inches': {
          this.standardUnitValue = this.valueToConvert * 2.54;
          break;
        }
        default:
          break;
      }
      this.convertedValue = this[`cmsTo${capitalize(this.valueToConvertUnit)}`];
    }
    return this.convertedValue;
  }
  cmsToInches() {
    return this.standardUnitValue / 2.54;
  }
  cmsToFeet() {
    return this.standardUnitValue / 30.48;
  }
  roundUp() {
    this.round('up');
  }
  roundDown() {
    this.round('down');
  }
  round(upOrDown) {
    let roundFunc = 'round';
    if (upOrDown === 'up') {
      roundFunc = 'ceil';
    } else if (upOrDown === 'down') {
      roundFunc = 'floor';
    }
    return Math[roundFunc](this.convertedValue);
  }
}

const convert = valueToConvert => new Convert(valueToConvert);

export default convert;
