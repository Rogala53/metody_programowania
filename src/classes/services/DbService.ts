abstract class DbService {
    private database: string;
    private server: string;
    private username: string;
    private password: string;
    constructor()
    private connect(db: DbConnectCriteria): boolean;
}