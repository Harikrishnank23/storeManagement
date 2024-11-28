const constant = require('./index');

function successRes(data, msg) {
  return {
    success: true,
    data,
    error: null,
    message: msg || 'Success',
  };
}
function getAndCount(data, count) {
  return {
    status: true,
    data,
    count,
    message: 'Success',
  };
}
function getAndCount1(data, count) {
  return {
    success: true,
    data,
    count,
    message: 'Success',
  };
}
function createRes(data, msg) {
  return {
    status: constant.status_success,
    success: true,
    data,
    error: null,
    message: msg || 'Created',
  };
}

function createErrorRes(data, msg) {
  return {
    status: constant.message_success,
    success: true,
    data,
    error: 'error',
    message: msg || 'Created',
  };
}

function badReqRes(err, msg) {
  return {
    status: constant.status_bad_request,
    success: false,
    data: null || err,
    error: err,
    message: msg || 'Bad Request - Invalid Values',
  };
}

function unAuthRes(err, msg) {
  return {
    status: constant.message_unauthorized,
    success: false,
    data: null,
    error: err,
    message: msg,
  };
}

function ForbiddenRes(err, msg) {
  return {
    status: constant.status_forbidden,
    success: false,
    data: null,
    error: err,
    message: msg || 'Forbidden',
  };
}

function notFoundRes(msg) {
  return {
    status: constant.status_not_found,
    success: false,
    data: null,
    error: null,
    message: msg || 'Data Not Found',
  };
}
function servErrRes(err, msg) {
  return {
    status: constant.status_internal_server_error,
    success: false,
    data: null,
    error: err,
    message: msg || 'Server Error',
  };
}

function getRes(res, result) {
  const { success, data } = result;

  if (!success) {
    return res
      .status(constant.status_internal_server_error)
      .json(servErrRes(data));
  }

  if (data == null) return res.status(constant.status_not_found).json(notFoundRes());

  return res.status(constant.status_success).json(successRes(data));
}

function getResWithTrueRes(res, result) {
  const { success, data } = result;

  if (!success) {
    return res
      .status(constant.status_internal_server_error)
      .json(servErrRes(data));
  }

  if (data == null) return res.status(constant.status_success).json(successRes(data));

  return res.status(constant.status_success).json(successRes(data));
}

function postRes(res, result, msg) {
  const { success, data } = result;

  if (!success && data) {
    return res
      .status(constant.status_bad_request)
      .json(servErrRes(data));
  } if (!success) {
    return res
      .status(constant.status_internal_server_error)
      .json(servErrRes(data));
  }

  return res.status(constant.status_inserted).json(createRes(data, msg));
}

function postErrorRes(res, result, msg) {
  const { success, data } = result;
  if (!success && data) {
    return res
      .status(constant.status_bad_request)
      .json(servErrRes(data));
  } if (!success) {
    return res
      .status(constant.status_internal_server_error)
      .json(servErrRes(data));
  }

  return res.status(constant.status_inserted).json(createErrorRes(data, msg));
}

function putRes(res, result, msg) {
  const { success, data } = result;

  if (!success) {
    return res
      .status(constant.status_internal_server_error)
      .json(servErrRes(data));
  }
  return res.status(constant.status_success).json(successRes(data, msg));
}

function deleteRes(res, result, msg) {
  const { success, data } = result;

  if (!success) {
    return res
      .status(constant.status_internal_server_error)
      .json(servErrRes(data));
  }

  return res.status(constant.status_success).json(successRes(data, msg));
}

function errRes(res, result, msg) {
  const { success, data } = result;
  if (!success) {
    return res
      .status(constant.status_internal_server_error)
      .json(badReqRes(data, msg));
  }

  return res.status(constant.status_success).json(successRes(data, msg));
}

function notFound(res, result, msg) {
  const { success, data } = result;
  if (!success) {
    return res
      .status(constant.status_not_found)
      .json(notFoundRes(msg));
  }
  return res.status(constant.status_success).json(successRes(data, msg));
}

function badReqResErr(res, result, msg) {
  const { success, data } = result;

  if (!success) {
    if (data === 'usernameExist' || data === 'mobile Exist' || data === 'email exist') {
      return res
        .status(constant.status_bad_request)
        .json(badReqRes(data, msg));
    }

    return res
      .status(constant.status_bad_request)
      .json(badReqRes(data, msg));
  }

  return res.status(constant.status_success).json(successRes(data, msg));
}

function getResCount(res, result) {
  const { success, data, count } = result;

  if (!success) {
    return res
      .status(constant.status_internal_server_error)
      .json(servErrRes(data));
  }

  if (data == null) return res.status(constant.status_not_found).json(notFoundRes());

  return res.status(constant.status_success).json(getAndCount(data, count));
}

function getResCount1(res, result) {
  const { success, data, count } = result;

  if (!success) {
    return res
      .status(constant.status_internal_server_error)
      .json(servErrRes(data));
  }

  if (data == null) return res.status(constant.status_not_found).json(notFoundRes());

  return res.status(constant.status_success).json(getAndCount1(data, count));
}

function ForbiddenResErr(res, result, msg) {
  const { success, data } = result;

  if (!success) {
    return res
      .status(constant.status_forbidden)
      .json(ForbiddenRes(data, msg));
  }

  return res.status(constant.status_success).json(successRes(data, msg));
}
module.exports.successRes = successRes;
module.exports.createRes = createRes;
module.exports.badReqRes = badReqRes;
module.exports.unAuthRes = unAuthRes;
module.exports.ForbiddenRes = ForbiddenRes;
module.exports.notFoundRes = notFoundRes;
module.exports.servErrRes = servErrRes;
module.exports.getRes = getRes;
module.exports.postRes = postRes;
module.exports.postErrorRes = postErrorRes;
module.exports.putRes = putRes;
module.exports.deleteRes = deleteRes;
module.exports.errRes = errRes;
module.exports.badReqResErr = badReqResErr;
module.exports.notFound = notFound;
module.exports.getAndCount = getAndCount;
module.exports.getResCount = getResCount;
module.exports.getResWithTrueRes = getResWithTrueRes;
module.exports.ForbiddenResErr = ForbiddenResErr;
module.exports.getResCount1 = getResCount1;
