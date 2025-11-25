// @ts-ignore
export enum LogLevel { DEBUG, INFO, WARN, ERROR}

export class Logger {
    static log(level: LogLevel, message: string, meta?: any) {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] [${LogLevel[level]} ${message}`, meta || '');
    }
    static error(message: string, error?: any) {
        this.log(LogLevel.ERROR, message, error);
    }

    static info(message: string, error?: any) {
        this.log(LogLevel.INFO, message, error);
    }

    static debug(message: string, error?: any) {
        this.log(LogLevel.DEBUG, message, error);
    }

    static warn(message: string, error?: any) {
        this.log(LogLevel.WARN, message, error);
    }
}