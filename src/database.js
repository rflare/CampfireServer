import * as mysql from 'mysql2'

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    database: process.env.DATABASE,
    password: process.env.DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 50,
    idleTimeout: 60000,
})

export async function getPosts()
{
    const sql = "SELECT * FROM posts ORDER BY RAND() LIMIT 50"
    return new Promise((resolve, reject) => {
        pool.query(sql, (err, rows) => {
            if(err)
                reject(err)

            resolve(rows)
        })
    })
}

export function insertPost(name, text, time)
{
    pool.query(`INSERT INTO posts VALUES ("${sanitize(text)}", "${sanitize(name)}", ${time})`, (err, result) => {
		if (err)
			throw err;
	})
}

function sanitize(str)
{
    return str.replace("\"", "\\\"")
}
