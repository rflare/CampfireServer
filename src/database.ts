import * as mysql from 'mysql2'
import Post from './post'

export default class Database {
    private pool: mysql.Pool

    constructor() {
        this.pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USERNAME,
            database: process.env.DATABASE,
            password: process.env.DB_PASSWORD,
            waitForConnections: true,
            connectionLimit: 50,
            idleTimeout: 60000, //1 minute timeout I think
        })
    }

    public getPosts() {
        //You can only fetch 100 posts
        const sql = `
        
        SELECT * FROM posts 
        ORDER BY RAND() 
        LIMIT 100
        
        `

        return new Promise((resolve, reject) => {
            this.pool.query(sql, (err, rows) => {
                if(err)
                    reject(err)

                resolve(rows)
            })
        })
    }
    public insertPost(post: Post) {
        const sql = `
        
        INSERT INTO posts (
            text,
            name,
            timeMillis
        )

        VALUES (

            "${this.sanitize(post.text)}",
            "${this.sanitize(post.name)}",
            ${post.timeMillis}

        )`


        this.pool.query(sql, (err, result) => {

		    if (err)
			    throw err;
	    })
    }
    private sanitize(str: String)
    {
        return str
        .split('\\')
        .join('\\\\')
        .split('\"')
        .join('\\\"')
    }
}
