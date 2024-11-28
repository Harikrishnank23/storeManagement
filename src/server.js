const gateway = require('fast-gateway');
const logger = require('./logger/logger');

const server = gateway({
  routes: [{
    prefix: '/master',
    target: 'http://localhost:9002',
  },
  {
    prefix: '/staff',
    target: 'http://localhost:9003',
  },
  {
    prefix: '/supervisor',
    target: 'http://localhost:9004',
  },
  ],
});

server.start(9001).then(() => {
  logger.logger('info', 'API Gateway started at port 9001');
});