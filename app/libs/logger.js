const bunyan = require('bunyan');

const logger = bunyan.createLogger({
    name: "carmin",
    streams: [{
        type: 'rotating-file',
        path: __dirname + './../log/loginfo.json',
        period: '1d',
        count: 30    
    }],
    level: 'trace',
    serializers: bunyan.stdSerializers
});

exports.logger = logger;
