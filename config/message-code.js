const MESSAGE_CODE = {
  // success series -2000
  "SUCCESS": {
    statusCode: "EXP-2000",
    status: 200,
    message: "Success"
  },

  // client side error
  "BAD_REQUEST": {
    statusCode: "EXP-4000",
    status: 400,
    message: "Bad Request"
  },
  "VALIDATION_ERROR": {
    statusCode: "EXP-4002",
    status: 422,
    message: "Validation Error"
  },
  "ALREADY_EXIST": {
    statusCode: "EXP-4003",
    status: 404,
    message: "Data is already exist"
  },
  "NOT_FOUND": {
    statusCode: "EXP-4004",
    status: 404,
    message: "Not Found"
  },
  "USER_REPORTED": {
    statusCode: "EXP-4005",
    status: 404, // confirm this status code
    message: "User is reported for misusing the application"
  },
  "USER_DEACTIVATED": {
    statusCode: "EXP-4006",
    status: 404, // confirm this status code
    message: "User is deactivated"
  },

  // auth error
  "UNAUTHORIZED_ERROR": {
    statusCode: "EXP-4001",
    status: 401,
    message: "Unauthorized Access"
  },
  "INVALID_EMAIL_OR_PASSWORD": {
    statusCode: "EXP-4002",
    status: 401,
    message: "Invalid email or password"
  },
  "OTP_EXPIRY": {
    statusCode: "EXP-4003",
    status: 401,
    message: "OTP expiry"
  },


  // internal error - 5000
  "INTERNAL_ERROR": {
    statusCode: "EXP-5000",
    status: 500,
    message: "Failed"
  }
}

module.exports = MESSAGE_CODE