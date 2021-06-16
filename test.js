const mongoose = require ('mongoose')

const connect =() =>{
    return mongoose.connect('mongodb://localhost:27017/whatever', { useNewUrlParser: true, useUnifiedTopology: true })
}

const student =new mongoose.Schema({
    firstName: {
        type: String,
        required:true,
        unique:true
    },
    faveFoods: [{type:String}],
    info:{
        school:{
            type:String
        },
        shoeSize:{
            type: Number
        }
    },
    school:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"school"
    }
}, {timestamps:true})

const school = new mongoose.Schema({
    name:String,
    openSince: Number,
    students:Number,
    isGreat:Boolean,
    staff:[{type:String}]
})

const School = moongoose.model('school', school)
const Student =mongoose.model('student', student)

connect()
.then(async connection => {
    //upsert update a document if doesn't exist
    //new true return the document that was not updated
    const schoolConfig={
        name:"mlk elementry",
        openSince: 2009,
        students:1000,
        isGreat:true,
        staff:["a", "b", "c"]
    }
    const school2={
        name:"Wild Academy",
        openSince: 2019,
        students:600,
        isGreat:false,
        staff:["v", "b", "g"]
    }
    const schools =await School.create([schoolConfig, school2])
    const match = await School.find({
        $in: {staff: ["v", "b", "g"]}
        /* findOne students:{$gt:600, $lt:800},
        isGreat:true */
        
    
    })
    .sort({openSince:-1})
    .limit(2)
    .exec()
    /* const school = await School.findOneAndUpdate(
        {name:'Mlk elementry'}, 
        {name:'Mlk elementry'}, 
        {upsert:true, new: true}
        ).exec()
    const student = await Student.create({firstName:'Joe', school: school._id}).exec()
    const student2 = await Student.create({firstName:'Mark', school: school._id}).exec() */
    
    //const match = await Student.findOne({firstName.'Marc'})
    const match = await Student.findById(student.id)
    .populate('school')
    .exec()
    console.log(match)
})
.catch(e => console.error(e))