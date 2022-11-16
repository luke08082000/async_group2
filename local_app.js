const mongoose = require('mongoose')
const express = require('express')
const Painting = require('./painting')
const app = express()

const dbUri = "mongodb://localhost:27017/artdb";

mongoose.connect(dbUri)
    .then(result => {
        console.log('connected to the database...')
        app.listen(27017, err => {
            if(!err) console.log("listening to port 27017")
        })
    })
    .catch(error => {
        console.log('cannot connect to the database...')
    })

app.use(express.json())

//Create
app.post('/painting', (req, res) => {
    const p2 = new Painting(req.body)
    p2.save()
        .then(result => res.send(result))
        .catch(err => console.log(err))
})

//Read
app.get('/painting/:id',(req, res) => {
    Painting.findById(req.params.id)
    .then(result => {
        res.send(result)
    })
    .catch(err => {
        res.send("cannot read document...")
    })
})

//Update
app.patch('/updateTitle/:id', (req, res) => {
    const newPaintingTitle = req.body
    Painting.findByIdAndUpdate(req.params.id, newPaintingTitle)
        .then(result => {
            res.send(result)
        })
        .catch(err => {
            res.send("cannot update...")
        })
})

//Delete
app.delete('/delete/:id', (req, res) => {
    Painting.findByIdAndDelete(req.params.id)
        .then(result => {
            res.send(result)
        })
        .catch(err => {
            res.send("cannot delete...")
        })
})