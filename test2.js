const mongoose = require ('mongoose')

const connect =() =>{
    return mongoose.connect('mongodb://localhost:27017/whatever', { useNewUrlParser: true, useUnifiedTopology: true })
}

const school = new mongoose.Schema({
    name:String,
    openSince: Number,
    students:Number,
    isGreat:Boolean,
    staff:[{type:String}]
})

//hooks

school.index({
    district:1,
    name:1,
}, {unique:true})

school.pre("save", function(){
    console.log("before save")
})

school.post("save", function(){
    console.log("after save")
})

school.virtual('staffCount')
    .get(function(){
        return this.staff.lenght
    })

const School = moongoose.model('school', school)

connect()
.then(async connection => {
    const mySchool =await School.create({
        name: "my school",
        staff:["v", "f", "fsa"]
    })
    
})
.catch(e => console.error(e))