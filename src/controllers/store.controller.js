const store = require("../model/store.model");
const responseFormater = require("../common/res_formatter");
//const config = require('../../config/index');
const constants = require("../common/index");

const createStore = async (req, res) => {
  const { storeNo, storeName, area } = req.body;
  const apiName = req.method + req.originalUrl;
  const result = await store.createStore(storeNo, storeName, area,apiName);

  if (result.data === "already exist") {
    return res
      .status(constants.status_unauthorized)
      .json(responseFormater.unAuthRes(result.data, "already exist"));
  }
  if (result.success) {
    return res
      .status(constants.status_success)
      .json(
        responseFormater.successRes(result.data, "staffCreated successfully")
      );
  }
};
const listallStore = async (req, res) => {
  const result = await store.listallStore();
  return responseFormater.getRes(res, result);
};
const updateStore = async (req, res) => {
  const { storeNo, storeName, area } = req.body;
  const apiName = req.method + req.originalUrl;
  const result = await store.updateStore(storeNo, storeName, area,apiName);

  if (result.data === "already exist") {
    return res
      .status(constants.status_unauthorized)
      .json(responseFormater.unAuthRes(result.data, "already exist"));
  }
  if (result.success) {
    return res
      .status(constants.status_success)
      .json(
        responseFormater.successRes(result.data, "store updated successfully")
      );
  }
};
const deleteStore = async (req, res) => {
    const { storeNo } = req.body;
    const apiName = req.method + req.originalUrl;

  const result = await store.deleteStore(storeNo,apiName);

  if (result.data === "store dosent exists or deleted already") {
    return res
      .status(constants.status_unauthorized)
      .json(
        responseFormater.unAuthRes(
          result.data,
          "store dosent exists or deleted already"
        )
      );
  }
  if (result.success) {
    return res
      .status(constants.status_success)
      .json(
        responseFormater.successRes(result.data, "store deleted successfully")
      );
  }
};

module.exports.createStore = createStore;
module.exports.updateStore = updateStore;
module.exports.deleteStore = deleteStore;
module.exports.listallStore = listallStore;
