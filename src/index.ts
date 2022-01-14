
import { PrismaClient } from '@prisma/client'
import createServer from "./utils/server"


export const prisma = new PrismaClient()

const app = createServer()


app.listen(3000, () => {
    console.log("Server started on port 3000")
})
