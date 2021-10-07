var express = require('express')
var app = express()
var port = 8080

var cors = require('cors')
app.use(cors())

var ejs = require('ejs')

app.set('view engine', 'ejs')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/assets', express.static('assets'))

var mongo = require('mongodb')
var MongoClient = mongo.MongoClient
var mongoUrl = 'mongodb+srv://naga:test123@edumato.1t9ez.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
var db;

// home
app.get('/chats', (req, res)=>{
    res.render('chats.ejs')
})

MongoClient.connect(mongoUrl, (err, client)=>{
    if(err) console.log('error while connecting')
    db = client.db('whatsapp')
})

app.listen(port, ()=>{
    console.log(`listening to ${port}`)
})