import * as database from './database'
import express from 'express'
import { Post } from './post'

const app = express() 
const port = process.env.SERVER_LOCAL_PORT

export function init()
{
    app.use(express.json()) 

    app.get("/api/content/get", (req, res) => {
        database.getPosts()
        .then((posts) => {
            res.status(200).json(posts);
        })
    })

        //Inserts post from client into database
    app.post("/api/content/post", (req, res) => {
        const data: Post = req.body
        console.log(data)
        database.insertPost(data)
    })

    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
        console.log(`Go to http://127.0.0.1:${port}`);
    });
}
