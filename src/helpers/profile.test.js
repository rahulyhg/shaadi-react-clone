import profile from './profile';
import draftProfile from './draftProfile.json';

const user = profile(draftProfile.data['4SH71102083']);

describe('Incomplete Indian Male User', () => {
  it('should return true for user being Hindu', () => {
    expect(user.isHindu()).toBeTruthy();
  });
  xit('is Unmarried', () => {
    expect(user.isUnmarried()).toBeTruthy();
  });
  it('is NeverMarried', () => {
    expect(user.isNeverMarried()).toBeTruthy();
  });
  it('is Divorced', () => {
    expect(user.isDivorced()).toBeFalsy();
  });
  it('is Annulled', () => {
    expect(user.isAnnulled()).toBeFalsy();
  });
  it('is AwaitingDivorce', () => {
    expect(user.isAwaitingDivorce()).toBeFalsy();
  });
  it('is Widowed', () => {
    expect(user.isWidowed()).toBeFalsy();
  });
  it('is Married', () => {
    expect(user.isMarried()).toBeFalsy();
  });
  it('is ZipCountry', () => {
    expect(user.isZipCountry()).toBeFalsy();
  });
  it('is NRIPlusCountry', () => {
    expect(user.isNRIPlusCountry()).toBeFalsy();
  });
  it('is SAARCCountry', () => {
    expect(user.isSAARCCountry()).toBeTruthy();
  });
  it('is NRI', () => {
    expect(user.isNRI()).toBeFalsy();
  });
  it('is Indian', () => {
    expect(user.isIndian()).toBeTruthy();
  });
  it('is PostedBySelf', () => {
    expect(user.isPostedBySelf()).toBeFalsy();
  });
  it('is PostedByParent', () => {
    expect(user.isPostedByParent()).toBeTruthy();
  });
  it('is PostedByRelative', () => {
    expect(user.isPostedByRelative()).toBeFalsy();
  });
  it('is PostedByFriend', () => {
    expect(user.isPostedByFriend()).toBeFalsy();
  });
  it('is Manglik', () => {
    expect(user.isManglik()).toBeFalsy();
  });
  it('getHeOrShe returns correct verb', () => {
    expect(user.getHeOrShe()).toEqual('He');
  });
  it('getHimOrHer returns correct verb', () => {
    expect(user.getHimOrHer()).toEqual('Him');
  });
  it('getHisOrHer returns correct verb', () => {
    expect(user.getHisOrHer()).toEqual('His');
  });
  it('getMrOrMs returns correct verb', () => {
    expect(user.getMrOrMs()).toEqual('Mr.');
  });
  it('getHeOrSheOrYou returns correct verb', () => {
    expect(user.getHeOrSheOrYou()).toEqual('He');
  });
  it('getHimOrHerOrYou returns correct verb', () => {
    expect(user.getHimOrHerOrYou()).toEqual('Him');
  });
  it('getHisOrHerOrYou returns correct verb', () => {
    expect(user.getHisOrHerOrYou()).toEqual('His');
  });
  it('getMrOrMsOrYou returns correct verb', () => {
    expect(user.getMrOrMsOrYou()).toEqual('Mr.');
  });
  it('getHeOrSheOrYour returns correct verb', () => {
    expect(user.getHeOrSheOrYour()).toEqual('He');
  });
  it('getHimOrHerOrYour returns correct verb', () => {
    expect(user.getHimOrHerOrYour()).toEqual('Him');
  });
  it('getHisOrHerOrYour returns correct verb', () => {
    expect(user.getHisOrHerOrYour()).toEqual('His');
  });
  it('getMrOrMsOrYour returns correct verb', () => {
    expect(user.getMrOrMsOrYour()).toEqual('Mr.');
  });
  it('getRelationWithProfileCreator returns correct verb', () => {
    expect(user.getRelationWithProfileCreator()).toEqual('son');
  });
  it('addressUserByPassive returns correct verb', () => {
    expect(user.addressUserByPassive).toEqual("Rahul's");
  });
  it('addressUserByActive returns correct verb', () => {
    expect(user.addressUserByActive).toEqual('Rahul');
  });
  it('should be incomplete user', () => {
    expect(user.isIncompleteUser()).toBeTruthy();
  });
  xit('should be a religious south indian', () => {
    expect(user.isReligiousSouthIndian()).toBeTruthy();
  });
  it('should be not have zip disabled', () => {
    expect(user.isZipDisabled()).toBeFalsy();
  });
  it('should have posted as self', () => {
    expect(user.getRelationWithProfileCreator()).toEqual('son');
  });
  it('should have do as prefix', () => {
    expect(user.doOrDoes()).toEqual('Does');
  });
  it('should not be NRI+ country user', () => {
    expect(user.isNRIPlusCountry()).toBeFalsy();
  });
  it('should be SAARC country user', () => {
    expect(user.isSAARCCountry()).toBeTruthy();
  });
});
