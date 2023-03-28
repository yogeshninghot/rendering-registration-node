const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs")
const app = express();
const user = [];
const notify={
    status : 0,
    class : "",
    text :"",
}
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs")
app.use(express.static('public'))

app.get("/",(req,resp)=>{
    notify.status=0;
    resp.render('html',{status:notify.status,text:notify.text,class:notify.class})

})
app.post("/enroll",(req,resp)=>{
    let tempUser ={
        name:req.body.name,
        email:req.body.email,
    }
    if(tempUser.name!="" && tempUser.email!=""){
        user.push(tempUser);
        notify.status=1;
        notify.class="alert-success";
        notify.text="Details added successfully"
        resp.render('html',{status:notify.status,text:notify.text,class:notify.class})
    }
    else{
        notify.status=2;
        notify.text="Please add all the fields"
        resp.render('html',{status:notify.status,text:notify.text,class:notify.class})
    }
    
    console.log(user);
    // /notify
   
})

app.get("/users",(req,resp)=>{
    resp.render("user", {students:user})
})

app.listen(3000,()=>{
    console.log("app started on 3000")
})