class ProfileViewHelper {
  constructor(data) {
    this.canViewProfile = true;
    this.hisHer = 'their';
    this.defaultErrMsg = 'Sorry, this Member has chosen to hide {hisHer} Profile recently.';
    const errorMsgMap = {
      suspended: {
        msg: 'This Profile is currently not available as it has been hidden or deleted.',
      },
      // hidden flag true but status active meaning Ghold, api must change this
      active: {
        msg: 'Member has decided to keep {hisHer} profile hidden. Please check again after a few days.',
      },
      deactivated: {
        msg: 'This Profile is currently not available as it has been hidden or deleted.',
      },
      updatedprofile: {
        msg: 'Member has decided to keep {hisHer} profile hidden. Please check again after a few days.',
      },
      incomplete: {
        msg: 'This Profile is currently not available as it is under screening.',
      },
      no_such_profile: {
        msg: 'Sorry, this Member is not a Shaadi.com member. Please try again.',
      },
    };
    const member = data.profile.data && data.profile.data[Object.keys(data.profile.data)[0]];
    const { basic: { gender } = {}, account: { hidden, status = '', memberlogin: uid } = {} } = member || {};
    this.uid = uid;
    if (gender) {
      this.hisHer = gender === 'Male' ? 'his' : 'her';
    }
    const isHidden =
      String(hidden).toLowerCase() === 'y' ||
      ['suspended', 'deactivated', 'incomplete', 'updatedprofile'].includes(String(status).toLowerCase());
    if (!member || isHidden) {
      this.canViewProfile = false;
      this.errorStatus = isHidden ? status.toLowerCase() : 'no_such_profile';
      this.errorMsg = (errorMsgMap[this.errorStatus] ? errorMsgMap[this.errorStatus].msg : this.defaultErrMsg).replace(
        '{hisHer}',
        this.hisHer,
      );
    }
  }

  getUid() {
    return this.uid;
  }

  getErrorObj() {
    return {
      rejectPromise: true,
      error: {
        code: this.errorStatus,
        message: this.errorMsg,
      },
    };
  }
}

export default ProfileViewHelper;
