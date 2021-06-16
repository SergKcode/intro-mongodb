const mongoose = require ('mongoose');
const express =require('express');
const app = express()
const morgan = require('dev')
const {urlencoded, json} = require("body-parser")

const noteSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
        unique:true
    },
    body:{
        type:String,
        minlength: 10
    }
})

const Note = moongose.model("note", noteSchema)

app.use(morgan('dev'))
app.use(urlencoded({extended:true}))
app.use(json())

app.get('/note', async(req, res)=>{
    const notes = await Note.find({})
    .lean()
    .exec()
    res.status(200).json(notes)

})
app.post('/note', async(req, res)=>{
    const noteTobeCreated = req.body
    const note = await Note.create(noteTobeCreated)
    res.status(201).json(notes)

})

const connect =() =>{
    return mongoose.connect('mongodb://localhost:27017/whatever', { useNewUrlParser: true, useUnifiedTopology: true })
}

connect()
.then(async connection => {
    app.listen(5000)
    
    
})
.catch(e => console.error(e))