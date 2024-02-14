import Database from './database'
import express, { Express } from 'express'
import Post from './post'

export default class Router {
    private app: Express
    private port

    private database: Database

    constructor(database: Database) {

        this.app = express()
        this.port = process.env.SERVER_LOCAL_PORT

        this.database = database


        

        this.app.use(express.json())
        
        this.app.get("/api/content/get", (req, res) => {
            this.database.getPosts()
            .then((posts) => {
                res.status(200).json(posts);
            })
        })

        this.app.post("/api/content/post", (req, res) => {
            const data: Post = req.body
            console.log(data)
            this.database.insertPost(data)
        })

        this.app.listen(this.port, () => {
            console.log(`App listening on port ${this.port}`);
            console.log(`Go to http://127.0.0.1:${this.port}`);
        });

    }

}
