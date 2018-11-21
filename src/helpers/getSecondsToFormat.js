class SecondsToFormat {
  second = 1;
  minuteInSeconds = this.second * 60;
  hourInSeconds = this.minuteInSeconds * 60;
  dayInSeconds = this.hourInSeconds * 24;
  monthInSeconds = this.dayInSeconds * 30;
  yearInSeconds = this.dayInSeconds * 365.25;
  constructor(seconds) {
    this.absoluteSeconds = Math.round(seconds);
  }
  get years() {
    return Math.floor(this.absoluteSeconds / this.yearInSeconds);
  }
  get yearsInSeconds() {
    return this.years * this.yearInSeconds;
  }
  get months() {
    return Math.floor((this.absoluteSeconds % this.yearInSeconds) / this.monthInSeconds);
  }
  get monthsInSeconds() {
    return this.months * this.monthInSeconds;
  }
  get weeksInSeconds() {
    return Math.floor(this.daysInSeconds / 7);
  }
  get days() {
    return Math.floor((this.absoluteSeconds - this.yearsInSeconds - this.monthsInSeconds) / this.dayInSeconds);
  }
  get daysInSeconds() {
    return Math.floor(this.absoluteSeconds / this.dayInSeconds);
  }
  get hours() {
    return ((this.absoluteSeconds - this.seconds - this.minutesInSeconds) % this.dayInSeconds) / this.hourInSeconds;
  }
  get absoluteHours() {
    return this.absoluteSeconds / this.hourInSeconds;
  }
  get minutes() {
    return this.minutesInSeconds / this.minuteInSeconds;
  }
  get minutesInSeconds() {
    return (this.absoluteSeconds - this.seconds) % this.hourInSeconds;
  }
  get seconds() {
    return this.absoluteSeconds / this.minuteInSeconds < 1 ? this.absoluteSeconds : this.absoluteSeconds % this.minuteInSeconds;
  }
}

export default seconds => new SecondsToFormat(seconds);
