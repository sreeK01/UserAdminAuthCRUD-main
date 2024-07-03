const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/loginSignUp')
.then(()=>{
    console.log("connected to database")
})
.catch(()=>{
    console.log('faild to connect')
})


//schema    
const loginSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
//Collection
const collection=mongoose.model('collection1',loginSchema)






//adminschema    
const adminLoginSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})


//adminnCollection
const adminCollection=mongoose.model('adminCollection',adminLoginSchema)




module.exports=collection

module.exports=adminCollection