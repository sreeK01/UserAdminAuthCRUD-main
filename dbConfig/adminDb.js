const mongoose=require('mongoose')

mongoose.connect('mongodb://localhost:27017/loginSignUp')
.then(()=>{
    console.log("ADMIN connected to database")
})
.catch(()=>{
    console.log('faild to connect to ADMIN DATABASE')
})






//adminschema    
const adminLoginSchema=new mongoose.Schema({
    adminName:{
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






module.exports=adminCollection