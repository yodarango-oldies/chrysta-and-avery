const { response } = require('express');
const express  = require('express');
const app =  express();

const PORT = process.env.PORT || 3000;

////Middeware
app.use(express.static(__dirname + '/public'));
app.use(express.json())
app.use(express.urlencoded({ extended: false}))

//database
const Datastore = require('nedb')
const db = new Datastore('./database.db')
db.loadDatabase(error => console.log(error))

app.post('/rsvp', (req, resp)=>{
    db.insert({...req.body}, (error, data)=>{
        console.log(data)
    })
    resp.redirect('/')
})

app.get('/rsvp', (req, resp)=>{
    db.find({}, (error, data)=>{
        console.log(data)
        resp.json(data)
    })
})

app.listen(PORT, (error)=>
{
    console.log(`listening on ${PORT}`)
    if (error)
    {
        console.log(error)
    }
})

console.log(__dirname)