
import express from 'express'
import path from 'path'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import { makeExecutableSchema } from 'graphql-tools'
import { createServer } from 'http'
import { execute, subscribe } from 'graphql'
import graphqlHTTP from 'express-graphql'
import { SubscriptionServer } from 'subscriptions-transport-ws'

import typeDefs from './schema/schema'
import { resolvers } from './schema/resolvers'

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
})

const app = express()
app.use(cors())

app.use(fileUpload())
app.post('/upload', (req, res) => {

    if (req.files === null || req.files === undefined) {
        return res.status(400).json({ msg: 'No file uploaded' })
    }

    const file = req.files.file
    //__dirname
    file.mv(`${process.cwd()}/client/public/uploads/${file.name}`, err => {
        if (err) {
            console.error(err)
            return res.status(500).send(err)
        }

        res.json({ fileName: file.name, filePath: `/uploads/${file.name}` })
    })
})

const mongoUrlLocal = 'mongodb://localhost:27017/test3'
const mongoUrlLive = 'mongodb+srv://test1:test1@tmcluster-sptsd.mongodb.net/test?retryWrites=true&w=majority'
mongoose.Promise = global.Promise
mongoose.connect(mongoUrlLive)
mongoose.connection.once('open', () => {
    console.log('conneted to database')
})

const PORT = process.env.PORT || 5000

app.use('/graphql', bodyParser.json(), graphqlHTTP({
    schema: schema,
    graphiql: true
}))

app.use(express.static('client/public'))
app.get('*', (req, res) => {
    res.sendFile(path.resolve(process.cwd(), 'client', 'public', 'index.html'))
})

const server = createServer(app)

server.listen(PORT, () => {

    console.log('listening on 5000')

    new SubscriptionServer({
        execute,
        subscribe,
        schema: schema,
    }, {
        server: server,
        path: '/subscriptions',
    })
})