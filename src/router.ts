import Database from './database'
import express from 'express'
import UserPost from './userpost'

const app = express()
const port = process.env.SERVER_LOCAL_PORT

export default class Router {

    private database: Database

    constructor(database: Database) {

        this.database = database

        //Time to do express js stuff


        //JSON is standard
        app.use(express.json())
        

        //Get posts
        //Why tf does it have to return a promise
        app.get("/api/userpost/get", (req, res) => {
            
            this.database.getUserPosts()
            //Send data
            .then((userPosts: UserPost[]) => {

                const decryptedPosts = userPosts.map(userPost => UserPost.fromObject(userPost).decrypt())
                //Send posts to client
                res.status(200).json(decryptedPosts);

            })
        })

        //Put post to database

        app.post("/api/userpost/post", (req, res) => {

            const data: UserPost = UserPost.fromObject(req.body)
            console.log(data)
            this.database.insertUserPost(data.encrypt())

        })

        //Probably listening to different address on docker prod
        app.listen(port, () => {

            console.log(`App listening on port ${port}`);
            console.log(`URL is http://127.0.0.1:${port}`);
        });


    }

}
