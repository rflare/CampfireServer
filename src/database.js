import * as mysql from 'mysql2'

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    database: process.env.DATABASE,
    password: process.env.DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 50,
    idleTimeout: 60000, //1 minute timeout I think
})

export async function getPosts()
{
    //You can only fetch 100 posts
    const sql = "SELECT * FROM posts ORDER BY RAND() LIMIT 100"
    return new Promise((resolve, reject) => {
        pool.query(sql, (err, rows) => {
            if(err)
                reject(err)

            resolve(rows)
        })
    })
}
//Insert post from outside into database
export function insertPost(name, text, time)
{
    pool.query(`INSERT INTO posts (text, name, timeMillis) VALUES ("${sanitize(text)}", "${sanitize(name)}", ${time})`, (err, result) => {
		if (err)
			throw err;
	})
}
//Sanitize any inputs from outside
function sanitize(str)
{
    return str.replaceAll('\\', '\\\\').replaceAll('\"', '\\\"')
}
