import type {DbConnectCriteria} from "../../types/DbConnectCriteria"

export abstract class DbService {
    private database: string;
    private server: string;
    private username: string;
    private password: string;
    constructor(database: string, server: string, username: string, password: string) {
        this.database = database;
        this.server = server;
        this.username = username;
        this.password = password;
    }
    public connect(db: DbConnectCriteria): boolean;
}