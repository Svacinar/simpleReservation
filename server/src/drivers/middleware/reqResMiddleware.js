const {performance} = require('perf_hooks');

const reqResMiddleware = ({logger}) => (req, res, next) => {
    const t0 = performance.now();
    logger.log(`Request start: /${req.method} ${req.url}. Request body: ${JSON.stringify(req.body) || 'null'}`);
    res.on('finish', () => {
        logger.log(`Request end: /${req.method} ${req.url}. Status ${res.statusCode}. Response body: ${JSON.stringify(res.body) || 'null'}. Request processing took ${(performance.now() - t0).toFixed(2)} ms`);
    });
    next();
}

module.exports = {
    reqResMiddleware,
}