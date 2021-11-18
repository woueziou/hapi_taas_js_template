const winston = require('winston');
const {

    format,

} = require('winston');
const {
    combine,
    timestamp,
    label,
    printf
} = format;

const myFormat = printf(({
    level,
    message,
    timestamp
}) => {
    return `${timestamp} - ${level}: - ${message}`;
});
const logger = winston.createLogger({
    levels: winston.config.syslog.levels,
    // format: winston.format.simple(),
    format: winston.format.json(),
    defaultMeta: {
        service: 'lizera-service'
    },
    transports: [
        //
        // - Write all logs with level `error` and below to `error.log`
        // - Write all logs with level `info` and below to `combined.log`
        //
        new winston.transports.File({
            filename: 'error.log',
            level: 'error',
            format: combine(
                label({
                    label: ''
                }),
                timestamp(),
                myFormat
            )
        }),
        new winston.transports.File({
            filename: 'combined.log',
            format: combine(
                label({
                    label: ''
                }),
                timestamp(),
                myFormat
            )
        }),
    ],
});
const reqLogger = {
    whtsplogger: winston.createLogger({
        level: 'info',
        // format: winston.format.simple(),
        format: winston.format.json(),
        defaultMeta: {
            service: 'whatsapp-request-service'
        },
        transports: [
            //
            // - Write all logs with level `error` and below to `error.log`
            // - Write all logs with level `info` and below to `combined.log`
            //
            new winston.transports.File({
                filename: 'logs/whatsapp-error.log',
                level: 'error',
                format: combine(
                    label({
                        label: ''
                    }),
                    timestamp(),
                    myFormat
                )
            }),
            new winston.transports.File({
                filename: 'logs/whatsapp-request.log',
                format: combine(
                    label({
                        label: ''
                    }),
                    timestamp(),
                    myFormat
                )
            }),
        ],
    }),
    tlgrmlogger: winston.createLogger({
        level: 'info',
        // format: winston.format.simple(),
        format: winston.format.json(),
        defaultMeta: {
            service: 'telegram-request-service'
        },
        transports: [
            //
            // - Write all logs with level `error` and below to `error.log`
            // - Write all logs with level `info` and below to `combined.log`
            //
            new winston.transports.File({
                filename: 'logs/telegram-error.log',
                level: 'error',
                format: combine(
                    label({
                        label: ''
                    }),
                    timestamp(),
                    myFormat
                )
            }),
            new winston.transports.File({
                filename: 'logs/telegram-request.log',
                format: combine(
                    label({
                        label: ''
                    }),
                    timestamp(),
                    myFormat
                )
            }),

        ],
    }),
    userLogger: winston.createLogger({
        level: 'info',
        // format: winston.format.simple(),
        format: winston.format.json(),
        defaultMeta: {
            service: 'user-service'
        },
        transports: [
            //
            // - Write all logs with level `error` and below to `error.log`
            // - Write all logs with level `info` and below to `combined.log`
            //
            new winston.transports.File({
                filename: 'logs/user-error.log',
                level: 'error',
                format: combine(
                    label({
                        label: ''
                    }),
                    timestamp(),
                    myFormat
                )
            }),
            new winston.transports.File({
                filename: 'logs/user-request.log',
                format: combine(
                    label({
                        label: ''
                    }),
                    timestamp(),
                    myFormat
                )
            }),

        ],
    }),
    expressLogger: winston.createLogger({
        level: 'info',
        // format: winston.format.simple(),
        format: winston.format.json(),
        defaultMeta: {
            service: 'express-service'
        },
        transports: [
            //
            // - Write all logs with level `error` and below to `error.log`
            // - Write all logs with level `info` and below to `combined.log`
            //
            new winston.transports.File({
                filename: 'logs/express-error.log',
                level: 'error',
                format: combine(
                    label({
                        label: ''
                    }),
                    timestamp(),
                    myFormat
                )
            }),
            new winston.transports.File({
                filename: 'logs/express-request.log',
                format: combine(
                    label({
                        label: ''
                    }),
                    timestamp(),
                    myFormat
                )
            }),

        ],
    }),
    hermesLogger: winston.createLogger({
        level: 'info',
        // format: winston.format.simple(),
        format: winston.format.json(),
        defaultMeta: {
            service: 'hermes-service'
        },
        transports: [
            //
            // - Write all logs with level `error` and below to `error.log`
            // - Write all logs with level `info` and below to `combined.log`
            //
            new winston.transports.File({
                filename: 'logs/hermes-error.log',
                level: 'error',
                format: combine(
                    label({
                        label: ''
                    }),
                    timestamp(),
                    myFormat
                )
            }),
            new winston.transports.File({
                filename: 'logs/hermes-request.log',
                format: combine(
                    label({
                        label: ''
                    }),
                    timestamp(),
                    myFormat
                )
            }),

        ],
    }),

};

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
// eslint-disable-next-line no-undef
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        // format: winston.format.simple(),
        format: combine(
            label({
                label: ''
            }),
            timestamp(),
            myFormat
        ),
    }));

    reqLogger.whtsplogger.add(new winston.transports.Console({
        // format: winston.format.simple(),
        format: combine(
            label({
                label: ''
            }),
            timestamp(),
            myFormat
        ),
    }));
    reqLogger.tlgrmlogger.add(new winston.transports.Console({
        // format: winston.format.simple(),
        format: combine(
            label({
                label: ''
            }),
            timestamp(),
            myFormat
        ),
    }));
}

module.exports = {
    logger,
    reqLogger
};