const express = require('express')

require('dotenv').config()

const app = express()

const cors = require('cors')

const { conn } = require('./db')

const { bookRouter } = require('./routes/book.route')

app.use(cors())

app.use(express.json())


app.use("/book", bookRouter)


app.all('*', (req,res)=>{
    return res.status(404).send({
        "Error":"404 ! Invalid URL"
    })
})

app.listen(process.env.port, async ()=>{
    try {
        await conn 
        console.log('Connected to DB')
    } catch (error) {
        console.log(error)
    }
})