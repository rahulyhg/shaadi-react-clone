import get from 'lodash/get';

class ShaadiUser {
  constructor(shaadiUserData = {}) {
    Object.keys(shaadiUserData).forEach(propName => {
      this[propName] = shaadiUserData[propName];
    });
  }
  get fullName() {
    return get(this, 'location.state');
  }
  get state() {
    return get(this, 'location.state');
  }
  get city() {
    return get(this, 'location.city');
  }
  get zipStatus() {
    return get(this, 'location.zip_status');
  }
  get isZipDisabled() {
    return this.zipStatus === 'N';
  }
}

export default shaadiUserData => new ShaadiUser(shaadiUserData);
