import * as database from './database.js'
import express from 'express'
import cors from 'cors'

const app = express()
const port = 53342 

export function init()
{
    app.use(cors())

    app.use(express.json())

    app.use(express.static('dist'))

    app.get('/api/get', (req, res) => {
		database.getPosts()
            .then((posts) => {
   		        res.status(200).json(posts)
            })    
    })
    
    app.post('/api/post', (req, res) => {
        const body = req.body;
        database.insertPost(body.name, body.text, body.time)
    })

    app.listen(port, () => {
        console.log(`Running on port ${port}`)
        console.log(`Go to http://localhost:${port}/`)
    })
}
