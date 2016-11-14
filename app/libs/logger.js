const bunyan = require('bunyan');

const logger = bunyan.createLogger({
    name: "carmin",
    serializers: {
        req: reqSerializer
    }
});

exports.logger = logger;

function reqSerializer(req) {
    return {
        method: req.method,
        url: req.url,
        headers: req.headers
    };
}