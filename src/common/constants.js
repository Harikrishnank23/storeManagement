const config = require('../../config/index');

const userType = {
  ADMIN: 'admin',
  SUPERVISOR: 'supervisor',
  SPT: 'SPT',
  STAFF: 'staff',
  SCT: 'SCT',
};

const countStatus = {
  firstCount: 'firstCount',
  supervisorValidated: 'supervisorValidated',
  recount: 'recount',
  recountVerified: 'recountVerified',
};

const status = {
  Pending: 'Pending',
  Tallied: 'Tallied',
  Recheck: 'Recheck',
  RecheckMisMatched: 'RecheckMisMatched',
  RecheckTallied: 'RecheckTallied',
  Variance: 'Variance',
  Closed: 'Closed',
  Checked: 'Checked',
  OnGoing: 'OnGoing',
};
const stockEntryType = {
  OB: 'OB',
  CB: 'CB',
  PC: 'PC',
  TEMP: 'TEMP',
};
const closingBalance = '0';
const constantValues = {
  dataExist: 'dataExist',
  createSuccessful: 'createSuccessful',
  createFailed: 'createFailed',

  updateSuccessful: 'updateSuccessful',
  updateFailed: 'updateFailed',

  deleteSuccessful: 'deleteSuccessful',
  deleteFailed: 'deleteFailed',
  notFound: 'dataNotFound',
  alredyExist: 'dataExist',

  sheetNotFound: 'sheetNotFound',
  errorProcessingExcel: 'errorProcessingExcel',
  notTally: 'notTally',
  mismachShift: 'time and Shift Missmach',
  dataNotFound: 'product id not found',
};

const dateFormats = {
  dateOnly: 'YYYY-MM-DD',
  mysqlFormat: 'YYYY-MM-DD hh:mm:ss',
  defaultFormat: 'YYYY-MM-DD',
};

const shifts = ['OFF', 'MORNING', 'NIGHT'];

const changeShift = {
  MORNING: 'Morning',
  NIGHT: 'Night',
};
const sheetName = 'Sheet1';

const transactionType = {
  RESERVE: 'reserve',
  TRANSFEROUT: 'transferOut',
  SALE: 'sale',
  RNS: 'RNS',
  TRANSFERIN: 'transferIn',
  DISPLAY: 'display',
  STOCK: 'stock',
  SALESRETURN: 'salesreturn',
  PHYCOUNT: 'psyCount',
  NOENTRY: 'noEntry',
  VARIFICATION: 'spVerification',
  Recheck: 'recheckOB',
};

const redisType = {
  CATEGORYID: `${config.NODE_ENV}_cat_id`,
  CLASSID: `${config.NODE_ENV}_class_id`,
  SUBCLASS: `${config.NODE_ENV}_subClass_id`,
  STORE: `${config.NODE_ENV}_store_id`,
  PRODUCT: `${config.NODE_ENV}_prod_id`,
  EMPLOYEEID: `${config.NODE_ENV}_emp_id_`,
};

const recheck = true;

module.exports = {
  userType,
  countStatus,
  constantValues,
  dateFormats,
  shifts,
  status,
  stockEntryType,
  sheetName,
  transactionType,
  closingBalance,
  changeShift,
  redisType,
  recheck,
};
