const express = require('express');
const port = 6000;
const multer = require('multer');

const app = express();

const fileStorageEngine = multer.diskStorage({
    destination : (req,res,cb)=>{
        cb(null,'./images');

    },
    filename:(req,file,cb)=>{
        cb(null,Date.now() + "-" + file.originalname);
    }

})

const upload = multer({storage:fileStorageEngine});

//Uploaded single file using Postman
app.post('/single',upload.single("image"),(req,res)=>{
    console.log(req.file);
    res.send("single file uploaded sucessfull!");
});
//uploaded multiple file using postman
app.post('/multiple',upload.array("images",3),(req,res)=>{
    console.log(req.files);
    res.send("multiple file uploaded sucessfull!");
})



app.listen(port,function(err){
    if(err){
        console.log('Erorr in Running server',err);

    }else{
        console.log('server running fine in port number:',port);
    }
    
});