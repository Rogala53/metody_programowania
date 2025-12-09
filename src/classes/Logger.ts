export enum LogLevel { DEBUG, INFO, WARN, ERROR}

export class Logger {
    private static instance: Logger | null = null;
    private constructor() {}

    public static getInstance(): Logger {
        if(this.instance == null) {
            this.instance = new Logger();
        }
        return this.instance;
    }
    static log(level: LogLevel, message: string, meta?: any) {
        const timestamp = new Date().toLocaleDateString("pl-PL", { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric" });
        console.log(`[${timestamp}] ${LogLevel[level]} ${message}`, meta || '');
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