import capitalize from './capitalize';

class Event {
  constructor(event) {
    this.type = event && event.type;
  }
  getCapitalizeType() {
    if (typeof this.type !== 'string') {
      return '';
    }
    return capitalize(String(this.type).toLowerCase());
  }
  isChangeEvent() {
    return this.type === 'change';
  }
  isFocused() {
    return this.type === 'focus' || this.isChangeEvent();
  }
  isFocusedOut() {
    return this.type === 'blur';
  }
  isClicked() {
    return this.type === 'click';
  }
}

export default event => new Event(event);
