const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/loginSignUp')
.then(()=>{
    console.log("user connected to database")
})
.catch(()=>{
    console.log('faild to connect to USER DATABASE')
})


//schema    
const userLoginSchema=new mongoose.Schema({
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
const userCollection=mongoose.model('userCollection',userLoginSchema)








module.exports=userCollection

