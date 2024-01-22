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

export function getPosts()
{
	let posts;
	pool.query("SELECT * FROM posts ORDER BY RAND() LIMIT 50;", (err, result) => {
		if (err)
			throw err;
		posts = result;
	})

	return posts;
}
