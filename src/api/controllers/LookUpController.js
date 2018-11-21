import requestService from '../services/requestService';
import getStateLookUp from '../ww4/getStateLookUp';
import getCityByZipLookUp from '../ww4/getCityByZipLookUp';
import getCityLookUp from '../ww4/getCityLookUp';
import getDistrictLookUp from '../ww4/getDistrictLookUp';
import getCasteRequest from '../ww4/getCasteRequest';
import getSubCasteRequest from '../ww4/getSubCasteRequest';
import getGotraList from '../ww4/getGotraList';
import getCountryList from '../ww4/getCountryList';
import getEducationList from '../ww4/getEducationList';
import getWorkingAsList from '../ww4/getWorkingAsList';
import getAnnualIncomeList from '../ww4/getAnnualIncomeList';
import getPhoneCountryList from '../ww4/getPhoneCountryList';
import getCollegeRequest from '../ww4/getCollege';
import getEmployerRequest from '../ww4/getEmployer';
import getRashiRequest from '../ww4/getRashi';
import getNakshatraRequest from '../ww4/getNakshatra';
import getDomainRequest from '../ww4/getDomain';
import getDoshamTypesRequest from '../ww4/getDoshamTypes';
import getEthnicityRequest from '../ww4/getEthnicity';
import decorators from '../decorators';

const getResponseData = (fieldName, response = {}) => (response && response.data && response.data[fieldName]) || [];

const getOptions = (fieldName, response) => getResponseData(fieldName, response).list;

const getCountry = (logger, query, auth) =>
  requestService(logger, query, auth, getCountryList(query), response => getOptions('grewup_in', response));

const getState = (logger, query, auth) =>
  requestService(logger, query, auth, getStateLookUp(query), d => d && d.data && d.data.location && d.data.location[query.country]);

const getCityByZip = (logger, query, auth) => requestService(logger, query, auth, getCityByZipLookUp(query), decorators.googleCities);

const getCity = (logger, query, auth) =>
  requestService(logger, query, auth, getCityLookUp(query), response => response.data.location[query.country][query.state]);

const getDistrict = (logger, query, auth) =>
  requestService(logger, query, auth, getDistrictLookUp(query), response => response.data.location[query.country][query.state]);

const getCaste = (logger, query, auth) =>
  requestService(logger, query, auth, getCasteRequest(query), response => getOptions('caste', response));

const getSubCaste = (logger, query, auth) =>
  requestService(logger, query, auth, getSubCasteRequest(query), response => getOptions('subcaste', response));

const getEducation = (logger, query, auth) =>
  requestService(logger, query, auth, getEducationList(query), response => getOptions('education', response));

const getWorkingAs = (logger, query, auth) =>
  requestService(logger, query, auth, getWorkingAsList(), response => getOptions('industry_occupation', response));

const getAnnualIncome = (logger, query, auth) =>
  requestService(logger, query, auth, getAnnualIncomeList(query), response => getOptions('income', response));

const getGotra = (logger, query, auth) =>
  requestService(logger, query, auth, getGotraList(query), response => getOptions('gotra', response));

const getPhoneCountry = (logger, query, auth) =>
  requestService(logger, query, auth, getPhoneCountryList(query), response => response.data.phone_country);

const getRashi = (logger, query, auth) =>
  requestService(logger, query, auth, getRashiRequest(query), response => getOptions('moon_sign', response));

const getNakshatra = (logger, query, auth) =>
  requestService(logger, query, auth, getNakshatraRequest(query), response => getOptions('birth_star_nakshatra', response));

const getDomain = (logger, query, auth) =>
  requestService(logger, query, auth, getDomainRequest(query), response => getOptions('mt_domain', response));

const getDoshamTypes = (logger, query, auth) =>
  requestService(logger, query, auth, getDoshamTypesRequest(query), response => getOptions('dosham', response));

const getEthnicity = (logger, query, auth) =>
  requestService(logger, query, auth, getEthnicityRequest(query), response => getOptions('ethnicity', response));

const getCollege = (logger, query, auth) =>
  requestService(logger, query, auth, getCollegeRequest(query), response => response.data.colleges || []);

const getEmployer = (logger, query, auth) =>
  requestService(logger, query, auth, getEmployerRequest(query), response => response.data.employers || []);

export default {
  getCountry,
  getState,
  getCity,
  getCityByZip,
  getDistrict,
  getCaste,
  getSubCaste,
  getGotra,
  getEducation,
  getWorkingAs,
  getAnnualIncome,
  getPhoneCountry,
  getRashi,
  getNakshatra,
  getDomain,
  getDoshamTypes,
  getCollege,
  getEmployer,
  getEthnicity,
};
