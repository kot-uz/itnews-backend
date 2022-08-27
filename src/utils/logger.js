const { createLogger, format, transports } = require('winston');
const DailyRotateFile = require("winston-daily-rotate-file");
const config = require("config");

const opSys = process.platform;
let logsFolder = "./logs/";
if (opSys == "linux"){
  logsFolder = "/var/log/itnews/";
}

console.log("itnews backend starting ...");
console.log("logs folder:", logsFolder);

const logFormat = format.combine(
        format.timestamp({format: 'DD.MM.YYYY HH:mm:ss'}),
        format.align(),
        format.printf(info => `${info.level}: ${[info.timestamp]} ${info.message}`)
    );

const logFileTransport = new DailyRotateFile({
    filename: logsFolder + config.get("logConfig.logFile"),
    datePattern: 'YYYY-MM-DD',
    zippedArchive: false,
    maxSize: 20971520, // size of log file in bytes (if exceeds - new file will be created)
    level: config.get("logConfig.logLevel") || 'info',
});

module.exports = createLogger({
    format:logFormat,
    transports:[
        logFileTransport,
        new transports.Console({
            level: config.get("logConfig.logLevel"),
            colorize: true
        })
    ]
});