require('dotenv').config()
const express = require('express')
const massive = require('massive')
const ctrl = require('./products_controller')

const app = express()

const {SERVER_PORT, CONNECTION_STRING} = process.env

app.use(express.json())

massive({connectionString: CONNECTION_STRING, ssl: {rejectUnauthorized: false}
}).then(dbInstance => {app.set('db', dbInstance)
}).catch(err => console.log(err))

app.get('/api/products/:id', ctrl.getOne)
app.get('/api/products/', ctrl.getAll)
app.post('/api/products/', ctrl.create)
app.put('/api/products/:id', ctrl.update)
app.delete('/api/products/:id', ctrl.delete)

app.listen(SERVER_PORT, () => {
    console.log(`Server listening on port ${SERVER_PORT}`)
})