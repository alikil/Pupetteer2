const path = require('path');
const winston = require('winston')
exports.logger = (text,email) => {
    const loggerr = winston.createLogger({
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({filename: path.join(`./${email}`, '/log.txt')})
        ]
    })
    loggerr.info(text)
}