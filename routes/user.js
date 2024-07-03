const express = require('express')
const user = express.Router()
const app=express()
const session=require('express-session')
const userCollection=require('../dbConfig/userDb')




user.get('/', (req, res) => {

    if(req.session.user){
        res.redirect('home')
    }else{
        if(req.session.passwordwrong){
            res.render('login',{msg:"Invalid Credentials"})
            req.session.passwordwrong=false
        }else{
            res.render('login')
        }
      
    }


})
user.get('/home', (req, res) => {
    let items=[{
        image:'/images/Mercedes-Benz G-Class 2.d.webp',
        name:"Mercedes-Benz G-Class",
        category: "SUV",
        description:"5 Star Safety 6 kmpl 326-577 bhp",
        price:'2.5 CR'
       },
       {
        image:'/images/Mercedes-Benz Maybach S-Class 3.4.webp',
        name:"Mercedes-Benz Maybach S-Class",
        category: "Sedan",
        description:"Automatic. Maybach S-Class comes with 10 airbags",
        price:'3.4 CR'
       },
       {
        image:'/images/Mercedes-Benz C-Class 62.webp',
        name:"Mercedes-Benz C-Class",
        category: "Sedan",
        description:"C-Class price for 3 variants is listed below",
        price:'1 CR'
       },
       {
        image:'/images/Mercedes-Benz GLA 58.webp',
        name:"Mercedes-Benz GLA",
        category: "5 seater SUV",
        description:"4.6 User Rating (5) Rate & Win The price ",
        price:'Rs. 51.75 - 58.15 Lakh'
       },{
        image:'/images/Mercedes-Benz G-Class 2.d.webp',
        name:"Mercedes-Benz G-Class",
        category: "SUV",
        description:"5 Star Safety 6 kmpl 326-577 bhp",
        price:'2.5 CR'
       },
       {
        image:'/images/Mercedes-Benz Maybach S-Class 3.4.webp',
        name:"Mercedes-Benz Maybach S-Class",
        category: "Sedan",
        description:"Automatic. Maybach S-Class comes with 10 airbags",
        price:'3.4 CR'
       },
       {
        image:'/images/Mercedes-Benz C-Class 62.webp',
        name:"Mercedes-Benz C-Class",
        category: "Sedan",
        description:"C-Class price for 3 variants is listed below",
        price:'1 CR'
       },
       {
        image:'/images/Mercedes-Benz GLA 58.webp',
        name:"Mercedes-Benz GLA",
        category: "5 seater SUV",
        description:"4.6 User Rating (5) Rate & Win The price ",
        price:'Rs. 51.75 - 58.15 Lakh'
       },{
        image:'/images/Mercedes-Benz Maybach S-Class 3.4.webp',
        name:"Mercedes-Benz Maybach S-Class",
        category: "Sedan",
        description:"Automatic. Maybach S-Class comes with 10 airbags",
        price:'3.4 CR'
       },
       {
        image:'/images/Mercedes-Benz C-Class 62.webp',
        name:"Mercedes-Benz C-Class",
        category: "Sedan",
        description:"C-Class price for 3 variants is listed below",
        price:'1 CR'
       },
       {
        image:'/images/Mercedes-Benz GLA 58.webp',
        name:"Mercedes-Benz GLA",
        category: "5 seater SUV",
        description:"4.6 User Rating (5) Rate & Win The price ",
        price:'Rs. 51.75 - 58.15 Lakh'
       },{
        image:'/images/Mercedes-Benz GLA 58.webp',
        name:"Mercedes-Benz GLA",
        category: "5 seater SUV",
        description:"4.6 User Rating (5) Rate & Win The price ",
        price:'Rs. 51.75 - 58.15 Lakh'
       }]
    res.render('home',{items});
  });
user.get('/signup', (req, res) => {
   
    if(req.session.user){
        res.redirect('/home')
    }else{
    res.render('signup');
    }
});
user.post('/signup',async(req,res)=>{
    req.session.user = req.body.name
        const data = {
            name:req.body.name,
            password:req.body.password
        } 

        await userCollection.insertMany([data])
        res.redirect('home')
})

user.post('/home',async(req,res)=>{

    
       
  try{
    
    const data = await userCollection.findOne({name:req.body.name})
    if(data.password===req.body.password&&data.name===req.body.name){
      req.session.user = req.body.name
        res.redirect('home')
    }else{
        // res.send('Invalid Credentials')
        res.render('login',{msg:"invalid credentials"});
    }
  }catch{
    req.session.passwordwrong=false
    }
    
})

user.get('/logout',(req,res)=>{

  req.session.destroy()
  
  res.redirect('/') 


})










module.exports= user




