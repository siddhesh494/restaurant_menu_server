'use strict';

const bunyan = require('bunyan');
const httpContext = require('express-http-context')

const createLogger = (loggerName) => {
  const bunyanConfig = {
    name: loggerName,
    level: 'trace'
  }

  const logger = bunyan.createLogger(bunyanConfig)

  const constructLogObj = (level) => {
    return (functionName, action, ...args) => {
      try {
        let errorType = "NA"
        if(level === "error") {
          if(args[0] instanceof Error) {
            errorType = "TECH"
          } else {
            errorType = "BUSNISS"
          }
        }
        logger[level]({
          apiHash: httpContext.get("ApiHash"),
          apiName: httpContext.get("ApiName"),
          logType: level,
          functionName,
          action,
          errorType,
        }, ...args)

      } catch (error) {
        logger.error("Error in fetching Api Hash")
        logger.error(error)
        logger[level](...args)
      }
    }
  }

  const logObj = {
    info: constructLogObj("info"),
    error: constructLogObj("error")
  }

  return logObj
}

module.exports = createLogger