const express = require('express')
const admin = express.Router()
const userCollection=require('../dbConfig/userDb')
const adminCollection=require('../dbConfig/adminDb')
var ObjectId = require('mongodb').ObjectId

admin.get('/admin', (req, res) => {
    
    if(req.session.admin){
        res.redirect('adminHome')
    }else{
        if(req.session.passwordwrong){
            res.render('adminLogin',{msg:"wrong details"})
            req.session.passwordwrong=false
        }else{
            res.render('adminLogin')
        }
      
    }
});

admin.get('/adminHome', async(req, res) => {
    const people=await userCollection.find().lean()
    console.log("people:"+people)
    adminPro=req.session.admin
    res.render('adminHome',{people,adminPro});
  });


  admin.get('/add-user', function(req, res, next) {
    adminPro=req.session.admin
    res.render('add-user',{adminPro})
  });
  
  admin.post('/add-user',async (req,res)=>{
    console.log(req.body)
    const data={
      name:req.body.username,
     
      password:req.body.password
    }
    await userCollection.insertMany([data])
    res.redirect('adminHome')
  })
  
  admin.get('/delete-user/:id',async (req,res)=>{
    let proId=req.params.id
    console.log(proId)
    await userCollection.deleteOne({ _id:new ObjectId(proId) })
      res.redirect('adminHome')
  })
  
  
  admin.get('/edit-user/:id', async (req,res)=>{
    console.log('Edit user route called');
    adminPro=req.session.admin
    let proId=req.params.id
    const user=await userCollection.findOne({ _id:new ObjectId(proId) }).lean()
    console.log(user)
    res.render('edit-user',{adminPro,user})
  })
  
  admin.post('/edit-user/:id',async (req,res)=>{
    adminPro=req.session.admin
    let proId=req.params.id
    console.log(req.body)
    const data={
      name:req.body.username,
     
      password:req.body.password
    }
    await userCollection.updateOne({ _id:new ObjectId(proId) },{ $set: data })
      res.redirect('adminHome')
  })




admin.get('/adminSignup', (req, res) => {
    if(req.session.admin){
        res.redirect('adminHome')
    }else{
        res.render('adminSignup')
    }
    ;
});

admin.post('/adminSignup',async(req,res)=>{
    
        const data = {
            adminName:req.body.adminName,
            password:req.body.password
        }

        await adminCollection.insertMany([data])
        res.redirect('adminHome')
})

admin.post('/adminHome',async(req,res)=>{
    
  try{
    const data = await adminCollection.findOne({adminName:req.body.adminName})
    if(data.password===req.body.password&&data.adminName===req.body.adminName){
        req.session.admin = req.body.adminName
        res.redirect('adminHome')
    }else{
        // res.send('Invalid Credentials')
        res.render('adminLogin',{msg:"invalid credentials"});
    }
  }catch{
    req.session.passwordwrong=true
    //    res.send('wrong details') 
    }
    
})






admin.get('/adminLogout',(req,res)=>{

    req.session.destroy()
    
    res.redirect('/admin') 
  
  
  })  






module.exports= admin















