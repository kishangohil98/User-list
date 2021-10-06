import * as mysql from 'mysql'

export class DatabaseConnection {
    static connection;
    constructor(){
        this.connection = mysql.createConnection({
            host: process.env.HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });
    }

    getConnection() {
        return this.connection;
    }

    connectToDatabase() {
        this.connection.connect((err) => {
            if (err) throw err;
            console.log("MySql Connected!");
        });
    }

    query(databaseConnection, queryString, fields = undefined){
        return new Promise(function(resolve, reject){
            databaseConnection.query(
                queryString,
                fields,
                function(err, rows){
                    if (err) {
                        reject(new Error());
                    }
                    console.log("queryString", queryString)
                    if (rows === undefined){
                        reject(new Error("Error rows is undefined"));
                    } else {
                        resolve(rows);
                    }
                }
            )}
        ).catch((e) => {
            throw new Error(e);
        });
    }
}