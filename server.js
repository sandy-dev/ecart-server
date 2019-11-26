const express = require('express')
const graphqlHTTP = require('express-graphql')
const cors = require('cors')
const schema = require('./schema/schema')
const path = require('path')
const app = express()

const mongoUrlLocal = 'mongodb://localhost:27017/test3'

// Allow cross-origin
app.use(cors())

const mongoose = require('mongoose')

mongoose.connect(mongoUrlLocal)

mongoose.connection.once('open', () => {
    console.log('conneted to database')
})

app.use(
    '/graphql',
    graphqlHTTP({
        schema,
        graphiql: true
    })
)

app.use(express.static('public'))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))