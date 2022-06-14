const {
    transports,
    createLogger,
    format
} = require('winston');
const moment = require('moment')
require('moment-duration-format')

function logger() {
    return createLogger({
        level: 'info',
        format: format.combine(
            format.timestamp(),
            format.json()
        ),
        defaultMeta: {
            service: 'user-service'
        },
        transports: [
            new transports.File({
                filename: `./logs/${moment().format('DD-MM-YYYY')}_error.log`,
                level: 'error'
            }),
            new transports.File({
                filename: `./logs/${moment().format('DD-MM-YYYY')}_console.log`
            }),
            new transports.Console({
                level: 'debug',
                json: false,
                handleExceptions: true,
                colorize: true,
            }),
        ],
    });

}

module.exports = {
    logger
}