import * as mysql from 'mysql2'
import UserPost from './userpost'

export default class Database {
    private pool: mysql.Pool

    constructor() {
        this.pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USERNAME,
            database: process.env.DB_DATABASE,
            password: process.env.DB_PASSWORD,
            waitForConnections: true,
            connectionLimit: 50,
            idleTimeout: 60000, //1 minute timeout I think
        })
    }

    public getUserPosts(): Promise<UserPost[]> {
        //You can only fetch 100 posts
        const sql = `
        
        SELECT * FROM userPosts 
        ORDER BY RAND() 
        LIMIT 100
        
        `

        return new Promise((resolve, reject) => {
            this.pool.query(sql, (err: mysql.QueryError, rows: UserPost[]) => {
                if(err)
                    reject(err)

                resolve(rows)
            })
        })
    }
    public insertUserPost(userPost: UserPost) {
        const sql = `
        
        INSERT INTO userPosts (
            text,
            name,
            timeMillis
        )

        VALUES (

            "${userPost.text}",
            "${userPost.name}",
            "${userPost.timeMillis}"

        );`


        this.pool.query(sql, (err, result) => {

		    if (err)
			    throw err;
	    })
    }

    //Pretty much useless now
    private sanitize(str: String)
    {
        return str
        .split('\\')
        .join('\\\\')
        .split('\"')
        .join('\\\"')
    }
}
