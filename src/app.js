
import express from 'express'
import path from 'path'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import mongoose from 'mongoose'
//import config from 'config'
//import jwt from 'jsonwebtoken'
import bodyParser from 'body-parser'
import { makeExecutableSchema } from 'graphql-tools'
import { createServer } from 'http'
import { execute, subscribe } from 'graphql'
import graphqlHTTP from 'express-graphql'
import { SubscriptionServer } from 'subscriptions-transport-ws'

import typeDefs from './schema/schema'
import { resolvers } from './schema/resolvers'
//import auth from './middleware/auth'

const mongoUrlLocal = 'mongodb://localhost:27017/test3'
const mongoUrlLive = 'mongodb+srv://test1:test1@tmcluster-sptsd.mongodb.net/test?retryWrites=true&w=majority'

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
    //process.cwd()
    file.mv(`${process.cwd()}/client/public/uploads/${file.name}`, err => {
        if (err) {
            console.error(err)
            return res.status(500).send(err)
        }

        res.json({ fileName: file.name, filePath: `/uploads/${file.name}` })
    })
})

//get jwtToken
// app.get('/sign', (req, res) => {

//     const { _id } = req.body

//     jwt.sign(
//         { id: _id },
//         config.get('jwtSecret'),
//         { expiresIn: 1800 },
//         (err, token) => {
//             if (err) throw err;
//             res.json({
//                 token,
//                 user: {
//                     id: user.id,
//                 }
//             });
//         }
//     )
// })

mongoose.Promise = global.Promise
mongoose.connect(mongoUrlLive)
//mongoose.connect(config.get('mongoUriLive'))

mongoose.connection.once('open', () => {
    console.log('conneted to database')
})

const PORT = process.env.PORT || 5000
app.use('/graphql', bodyParser.json(), graphqlHTTP((request, response) => ({
    schema: schema,
    graphiql: true,
    context: { request: request, response: response }
})
))

app.use(express.static('client/public'))
app.get('*', (req, res) => {
    //process.cwd()
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