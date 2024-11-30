function response(data) {
  const returnObj = {
    ...data.messageCode,
  }
  if(data.message) returnObj.message = data.message
  if(data.data) returnObj.data = data.data
  return returnObj
}


module.exports = {
  response
}