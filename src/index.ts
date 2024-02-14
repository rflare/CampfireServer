import 'dotenv/config'

import Router from './router'
import Database from './database'

let database: Database = new Database()

let router: Router = new Router(database)