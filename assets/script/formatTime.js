class formatTime {
    constructor(miliseconds) {
      this._ms = E(miliseconds)
    }
    static fromYears(years) {
      return new formatTime(E(years).mul(31536e6))
    }
    static fromDays(days) {
      return new formatTime(E(days).mul(864e5))
    }
    static fromHours(hours) {
      return new formatTime(E(hours).mul(36e5))
    }
    static fromMinutes(minutes) {
      return new formatTime(E(minutes).mul(6e4))
    }
    static fromSeconds(seconds) {
      return new formatTime(E(seconds).mul(1e3))
    }
    static fromMilliseconds(milliseconds) {
      return new formatTime(milliseconds)
    }
    copyFrom(other) {
      this._ms = other._ms
    }
    get totalYears() {
      return this._ms.div(31536e6);
    }
    get totalDays() {
      return this._ms.div(864e5);
    }
    get totalHours() {
      return this._ms.div(36e5);
    }
    get totalMinutes() {
      return this._ms.div(6e4);
    }
    get totalSeconds() {
      return this._ms.div(1e3);
    }
    get totalMilliseconds() {
      return this._ms;
    }
    get years() {
      if (this._ms.isneg()) return ExpantaNum.ceil(this.totalYears);
      return ExpantaNum.floor(this.totalYears);
    }
    get days() {
      if (this._ms.isneg()) return new formatTime(this._ms.neg()).days.neg()
      return ExpantaNum.floor(this.totalDays.sub(this.totalDays.div(365).floor().times(365)));
    }
    get hours() {
      if (this._ms.isneg()) return new formatTime(this._ms.neg()).hours.neg()
      return ExpantaNum.floor(this.totalHours.sub(this.totalHours.div(24).floor().times(24)));
    }
    get minutes() {
      if (this._ms.isneg()) return new formatTime(this._ms.neg()).minutes.neg()
      return ExpantaNum.floor(this.totalMinutes.sub(this.totalMinutes.div(60).floor().times(60)));
    }
    get seconds() {
      if (this._ms.isneg()) return new formatTime(this._ms.neg()).seconds.neg()
      return ExpantaNum.floor(this.totalSeconds.sub(this.totalSeconds.div(60).floor().times(60)));
    }
    get milliseconds() {
      if (this._ms.isneg()) return new formatTime(this._ms.neg()).milliseconds.neg()
      return ExpantaNum.floor(this.totalMilliseconds.sub(this.totalMilliseconds.div(1e3).floor().times(1e3)));
    }
    toString(noMillSecond = false) {
      if (this.totalMilliseconds.lt(1)) return '0毫秒'
      let string = ''
      if (this.years.neq(0)) string = string + (formatWhole(this.years) + '年')
      if (this.days.neq(0) && this.years.lt(4e14)) string = string + (formatWhole(this.days) + '天')
      if (this.hours.neq(0) && this.years.lt(4e12)) string = string + (formatWhole(this.hours) + '时')
      if (this.minutes.neq(0) && this.years.lt(5e10)) string = string + (formatWhole(this.minutes) + '分')
      if (this.seconds.neq(0) && this.years.lt(1e9)) string = string + (formatWhole(this.seconds) + '秒')
      if (!noMillSecond && this.milliseconds.neq(0) &&  this.years.lt(4e7)) string = string + (formatWhole(this.milliseconds) + '毫秒')
      return string
    }
    toJSON() {
      return this.toString()
    }
  }