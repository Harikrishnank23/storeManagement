const winston = require('winston');
const config = require('../../config');

// In Dev, log output to both console and log file.Error Logs are logged seperately also.
const winstonLoggerDev = winston.createLogger({
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
    ),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: './logs/logs.log', level: 'info' }),
      new winston.transports.File({
        filename: './logs/error.log',
        level: 'error',
      }),
    ],
  });
  
  // In Production, log output to both console and log file. Error Logs are logged seperately also.
  const winstonLoggerProd = winston.createLogger({
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
    ),
    transports: [
      new winston.transports.File({ filename: './logs/logs.log', level: 'info' }),
      new winston.transports.File({
        filename: './logs/error.log',
        level: 'error',
      }),
    ],
  });

  const logger = (logLevel, log) => {
    if (config.NODE_ENV === 'dev') winstonLoggerDev.log(logLevel, log);
    if (config.NODE_ENV === 'prod') winstonLoggerProd.log(logLevel, log);
  };
  
  module.exports.logger = logger;