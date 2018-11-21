import React from 'react';
import { shallow } from 'enzyme';
import UploadVerificationId, { UploadedFiles, DocumentStatus } from '../../UploadVerificationId';
import s from '../styles';
import ProfilePhotoWithShield from '../../Common/ProfilePhotoWithShield';
import doProfileAction from '../../../actions/doProfileAction';
import doHeaderAction from '../../../actions/doHeaderAction';

const props = {
  uid: '',
  isNative: false,
  layout: 'desktop',
  nextUrl: '',
  user: {
    uid: '7SH123553',
    gender: 'male',
    firstName: 'Devansh',
    photos: {
      hasPhotos: true,
      photos: [
        {
          domain_name: '',
          '120X120': '',
        },
      ],
    },
    errusr: '',
  },
  documentUpload: {
    attachments: {
      'fixed-ui.png': {
        attachmentName: 'fixed-ui.png',
        attachmentPath: '/var/www/html/id-proof/y/ySH98509208-170366.png',
        isAttachmentUploaded: true,
        trustBadgeStatus: 'Y',
      },
    },
  },
};

const doTrustBadgeAction = () => {
  const resObj = {
    data: {
      data: [
        {
          id_proof: { count: 2, status: 'Uploaded' },
        },
      ],
    },
  };

  return new Promise((resolve, reject) => {
    resolve(resObj);
  });
};

props.doProfileAction = doProfileAction;
props.doTrustBadgeAction = doTrustBadgeAction;
props.doHeaderAction = doHeaderAction;

describe('Verify Your Profile with ID', () => {
  const UploadVerificationIdShallow = shallow(<UploadVerificationId {...props} />);
  const ProfilePhotoWithShieldShallow = shallow(<ProfilePhotoWithShield {...props} />);
  const UploadedFilesShallow = shallow(<UploadedFiles {...props} />);
  const DocumentStatusShallow = shallow(<DocumentStatus {...props} />);

  UploadVerificationIdShallow.instance().componentDidMount();

  it('Upload Verification ID page should mount', () => {
    expect(UploadVerificationIdShallow).toHaveLength(1);
  });

  it('Should have display document status', () => {
    expect(UploadVerificationIdShallow.state(`isAvailBadge`)).toEqual(`2 Documents Submitted`);
    expect(UploadVerificationIdShallow.state(`isDocScreening`)).toEqual(`Your documents are under screening`);
  });

  it('Profile photo with shield should mount', () => {
    expect(ProfilePhotoWithShieldShallow).toHaveLength(1);
  });

  it('Should have a upload first name heading', () => {
    expect(UploadVerificationIdShallow.find(s.VerifyHeading)).toHaveLength(2);
  });

  it('Should have a heading (h1)', () => {
    expect(UploadVerificationIdShallow.find(s.HelpHeading)).toHaveLength(1);
  });

  it('should have one form element in our component', () => {
    expect(UploadVerificationIdShallow.find(s.ProfileFormMain)).toHaveLength(1);
  });

  it('should have a input file box for upload document', () => {
    expect(UploadVerificationIdShallow.find(s.OfflineIdUploadWrap)).toHaveLength(1);
  });

  it('should display uploaded document', () => {
    expect(UploadedFilesShallow).toHaveLength(1);
  });

  it('should display uploaded document status', () => {
    expect(DocumentStatusShallow).toHaveLength(1);
  });

  it('has a continue button', () => {
    expect(UploadVerificationIdShallow.find(s.SubmitBtn)).toHaveLength(1);
  });

  describe('CTA on page', () => {
    it('click on choose file button', () => {
      UploadVerificationIdShallow.find(s.IdUploadBtn).simulate('click', { preventDefault: jest.fn() });
    });

    it('click on submit button', () => {
      UploadVerificationIdShallow.find(s.SubmitBtn).simulate('click', { preventDefault: jest.fn() });
    });
  });
});
