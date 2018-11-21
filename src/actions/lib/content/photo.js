import common from './common';
// const button = (text, l) => ({ type: 'button', text, url: l });
const link = (text, l) => ({ type: 'link', text, url: l });

export default {
  loudError: common.loudError,
  titleError: common.titleError,
  error: common.error,
  passwordRequested: name => [
    null,
    [`We have forwarded your request to ${name} along with your profile details.`],
    [`We will email you the Photo Password as soon as ${name} approves your request.`],
  ],
  photoRequested: (name, heShe) => [
    null,
    [
      `Your photo request has been sent to ${name} and ${heShe.toLowerCase()} has been added to your `,
      link(`Photo Request Sent list`, `https://www.shaadi.com/inbox/sent/photo-requests`),
      `. We will send you an email once ${heShe.toLowerCase()} has added photo(s).`,
    ],
  ],
  photoRequestedMobile: (name, heShe) => [
    'Photo Request sent',
    [
      `Your photo request has been sent to ${name} and ${heShe.toLowerCase()} has been added to your Photo Request Sent list. We will send you an email once ${heShe.toLowerCase()} has added photo(s).`,
    ],
  ],
  optionalPhotoError: (name, hisHer, gender, selfName, err, type) => {
    const typeErrors = {
      requestPassword: {
        photo_request_sent: [null, [`${name}'s profile already exists in your photo request list.`]],
        member_inactive: [
          null,
          [`Dear ${selfName},`],
          [`You can request password after your profile is screened and you have added your own photo(s).`],
        ],
        visitor: [null, ['You can use this feature if you are a Shaadi.com member.']],
        invalid_profile: [null, ['Unexpected Error !!']],
        member_blocked: [null, ['You cannot send Photo Password Requests to Blocked Members.']],
        profile_blocked: [null, ['The member may have either hidden or deactivated profile.']],
        member_hidden: [
          null,
          [
            "Your profile is currently hidden hence you cannot request photo. Kindly make your profile 'Visible' to be able to request photo password.",
          ],
        ],
        none: [
          null,
          [`You can request ${name} for a photo password after your own photo is added to your profile.`],
          [link(`Click here`, `https://www.shaadi.com/my-shaadi/photo/advance`), ' to add your photo now.'],
        ],
        member_photo_not_screened: [
          null,
          ['Currently your photo is being processed. As soon as your photo goes live, you can request password from other members.'],
        ],
        member_cancelled: [null, [`You cannot request photo password as you have cancelled ${name}.`]],
        member_declined: [null, [`You cannot request photo password as you have declined ${name}.`]],
        profile_declined: [null, [`You cannot request photo password as ${name} has declined you.`]],
        profile_cancelled: [null, [`You cannot request photo password as ${name} has cancelled you.`]],
        member_filtered_contacted: [
          null,
          [
            `You cannot request photo password as ${name} has filtered you i.e. you do not meet ${hisHer.toLowerCase()} partner requirements.`,
          ],
        ],
        member_filtered: [
          null,
          [
            `You cannot request photo password as ${name} has filtered you i.e. you do not meet ${hisHer.toLowerCase()} partner requirements.`,
          ],
        ],
        same_gender: [null, [`You may request photo password of only ${gender} members.`]],
        enter_password: [null, [`${name}'s profile already exists in your photo password request list.`]],
        profile_hidden: [null, [`You cannot send a photo password request as this Profile is hidden.`]],
      },
      requestPhoto: {
        photo_request_sent: [null, [`${name}'s profile already exists in your photo request list.`]],
        member_inactive: [
          null,
          [`Dear ${selfName},`],
          [`You can request for photos after your profile is screened and you have added your own photo(s).`],
        ],
        visitor: [null, ['You can use this feature if you are a Shaadi.com member.']],
        invalid_profile: [null, ['Unexpected Error !!']],
        member_blocked: [null, ['You cannot send a request to Blocked Members.']],
        profile_blocked: [null, ['The member may have either hidden or deactivated profile.']],
        member_hidden: [
          null,
          [
            "Your profile is currently hidden hence you cannot request photo. Kindly make your profile 'Visible' to be able to request for photos.",
          ],
        ],
        none: [
          null,
          [`You can request ${name} for a photo after your own photo is added to your profile.`],
          [link(`Click here`, `https://www.shaadi.com/my-shaadi/photo/advance`), ' to add your photo now.'],
        ],
        member_photo_not_screened: [
          null,
          ['Currently your photo is being processed. As soon as your photo goes live, you can request photos from other members.'],
        ],
        member_cancelled: [null, [`You cannot request a photo as you have cancelled ${name}.`]],
        member_declined: [null, [`You cannot request a photo as you have declined ${name}.`]],
        profile_declined: [null, [`You cannot request a photo as ${name} has declined you.`]],
        profile_cancelled: [null, [`You cannot request a photo as ${name} has cancelled you.`]],
        member_filtered_contacted: [
          null,
          [`You cannot request a photo as ${name} has filtered you i.e. you do not meet ${hisHer.toLowerCase()} partner requirements.`],
        ],
        member_filtered: [
          null,
          [`You cannot request a photo as ${name} has filtered you i.e. you do not meet ${hisHer.toLowerCase()} partner requirements.`],
        ],
        same_gender: [null, [`You may request a photo of only ${gender} members.`]],
        enter_password: [null, [`${name}'s profile already exists in your photo request list.`]],
        profile_hidden: [null, [`You cannot send a photo request as this Profile is hidden.`]],
        default: [null, [`Invalid request - "${`${err}`.replace('_', ' ')}".`]],
      },
    };

    typeErrors.passwordRequested = typeErrors.requestPassword;
    typeErrors.photoRequested = typeErrors.requestPhoto;
    const errors = typeErrors.requestPhoto;

    if (!err || err.includes(' ')) {
      return null;
    }
    return (typeErrors[type] || {})[`${err}`.toLowerCase()] || errors[`${err}`.toLowerCase()] || errors.default;
  },
};
