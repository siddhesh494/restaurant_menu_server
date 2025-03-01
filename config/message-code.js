const MESSAGE_CODE = {
  // success series -2000
  "SUCCESS": {
    statusCode: "EXP-2000",
    status: 200,
    success: true,
    message: "Success"
  },

  // client side error
  "BAD_REQUEST": {
    statusCode: "EXP-4000",
    status: 400,
    success: false,
    message: "Bad Request"
  },
  "VALIDATION_ERROR": {
    statusCode: "EXP-4002",
    status: 422,
    success: false,
    message: "Validation Error"
  },
  "ALREADY_EXIST": {
    statusCode: "EXP-4003",
    status: 404,
    success: false,
    message: "Data is already exist"
  },
  "NOT_FOUND": {
    statusCode: "EXP-4004",
    status: 404,
    success: false,
    message: "Not Found"
  },
  "USER_REPORTED": {
    statusCode: "EXP-4005",
    status: 404, // confirm this status code
    success: false,
    message: "User is reported for misusing the application"
  },
  "USER_DEACTIVATED": {
    statusCode: "EXP-4006",
    status: 404, // confirm this status code
    success: false,
    message: "User is deactivated"
  },

  // auth error
  "UNAUTHORIZED_ERROR": {
    statusCode: "EXP-4001",
    status: 401,
    success: false,
    message: "Unauthorized Access"
  },
  "INVALID_EMAIL_OR_PASSWORD": {
    statusCode: "EXP-4002",
    status: 401,
    success: false,
    message: "Invalid email or password"
  },
  "OTP_EXPIRY": {
    statusCode: "EXP-4003",
    status: 401,
    success: false,
    message: "OTP expiry"
  },


  // internal error - 5000
  "INTERNAL_ERROR": {
    statusCode: "EXP-5000",
    status: 500,
    success: false,
    message: "Failed"
  }
}

module.exports = MESSAGE_CODE