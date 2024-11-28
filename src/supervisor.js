const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('../config');
const logger  = require('./logger/logger');
const db = require('./db');
const routes=require('./routers/supervisor')
const logs = require('./logger/dbExceptionLogger');
const constants = require('./common/index');
const responseFormater=require('./common/res_formatter')


const PORT = config.SUPERVISOR_PORT;
const initServer= async() => {
    try {
        app.listen(PORT, () => {
            logger.logger('info', `supervisor running on port ${PORT}`);
        })
    } catch(error) {
        logger.logger('error', `Error starting server- ${JSON.stringify(error) || error}`);
    } 
}

async function initDB() {
    await db.init(config);
    initServer()
}


initDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());    
app.use(logs.logs);
app.use('/', routes);
app.disable('etag');

app.use((err, req, res, next) => {
    logger.logger(
      'error',
      JSON.stringify({ apiName: req.method + req.originalUrl }),
    );
    logger.logger('error', JSON.stringify(err));
    res.status(500).json(responseFormater.servErrRes(JSON.stringify(err)));
  });
  
  app.get('/', (req, res) => {
    res
      .status(constants.status_success)
      .json(responseFormater.successRes('Success', 'Logbook APIs Working '));
  });
  
  app.all('*', (req, res) => {
    res
      .status(constants.status_not_found)
      .json(responseFormater.notFoundRes('Invalid Route', 'Invalid Route'));
  });