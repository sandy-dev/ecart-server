const express = require('express')
const fileUpload = require('express-fileupload')
const graphqlHTTP = require('express-graphql')
const cors = require('cors')
const schema = require('./schema/schema')
const path = require('path')


const app = express()

const mongoUrlLocal = '***'
const mongoUrlLive = '***'

// Allow cross-origin
app.use(cors())


app.use(fileUpload())
// Upload Endpoint
app.post('/upload', (req, res) => {

    if (req.files === null || req.files === undefined) {
        return res.status(400).json({ msg: 'No file uploaded' })
    }

    const file = req.files.file

    file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
        if (err) {
            console.error(err)
            return res.status(500).send(err)
        }

        res.json({ fileName: file.name, filePath: `/uploads/${file.name}` })
    })
})


const mongoose = require('mongoose')

mongoose.connect(mongoUrlLive)

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
