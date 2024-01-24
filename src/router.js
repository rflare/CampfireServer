import * as database from './database.js'
import http from 'http'

const port = 53342 

export function init()
{

    const server = http.createServer((req, res) => {
        const path = req.url

        if(path === '/api/get') {
		    database.getPosts()
            .then((posts) => {
                res.writeHead(200, { "Content-Type": "application/json" });
   		        res.end(JSON.stringify(posts))
            })    
        }

        if(path === '/api/post')
        {
            let body = []

            req
            .on('error', err => {
                console.log(err)
            })
            .on('data', chunk => {
                body.push(chunk)
            })
            .on('end', () => {
                body = JSON.parse(Buffer.concat(body).toString())
                database.insertPost(body.name, body.text, body.time)
            });


        }


    })

    server.listen(port, () => {
        console.log(`App listening on port ${port}`);
    });
}
