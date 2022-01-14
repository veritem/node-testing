import express, { Express } from 'express'
import routes from "../routes"


function createServer():Express {
    const app = express()

    app.use(express.json())

    routes(app)

    return app
}


export default createServer
