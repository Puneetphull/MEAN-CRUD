require("../config/passportconfig");
require('../models/usermodel');
const mongoose = require('mongoose');
const passport = require("passport");
const passportlocal= require("passport-local");
//call mongoose model
var User = mongoose.model('user');
var path = require('path');

var multer = require('multer');
//jwr
var jwts = require('jsonwebtoken');

var filepath ;
//file upload

module.exports.addnewuser=(req,res)=>{
  console.log(filepath);
    var newUser = new User({
        name:req.body.name,
        email:req.body.email,
        profile:req.body.profile,
        location:req.body.location,
        password:req.body.password,


    });






    return newUser.save().then((docs)=>{
         res.status(200).json({

          message:"data is insterd",
             data:docs,
             success:true
         });

    })
    .catch((err)=>{
        res.status(401).json({
            message:"there is error",
            error:err.message,
            success:false,

        })

    });


}


module.exports.display=(req,res)=>{
    return User.find().then((docs)=>{
        res.status(200).json({
            message:'user is found',
            data:docs,
            success:true
        })

    })
    .catch((err)=>{
        res.status(401).json({
            message:'user not found',
            error:err.message,
            success:false,
        })

    })
}


module.exports.selectone=(req,res)=>{
    const id = req.params.userid;
    User.findById({_id:id}).then((docs)=>{
        return res.status(200).json({
            success:true,
            message:"User deatils",
            data:docs,
        })
        .catch((err)=>{
          return  res.status( 401).json({
                success:true,
                message:"user details not found",
                error:err.message,

            })

        })

    })

}
module.exports.updateuser=(req,res)=>{
    const id =req.params.id;
    const updatedata = req.body;
    User.findByIdAndUpdate({_id:id},{$set:updatedata}).then((docs)=>{
        return res.status(200).json({
            success:true,
            message:"data is update ",
            data:docs
        })
        .catch((err)=>{
        return res.status(401).json({
            success:false,
            message:"data is not updated",
            error:err.message,
        })
        })

    })
}

/// remove user by id

module.exports.remove=(req,res)=>{
    const id  = req.params.id;
    User.findByIdAndRemove({_id:id}).then((docs)=>{
        res.status(200).json({
            success:true,
            message:"user is deleted from the body",
            data :docs
        })
        res.status(401).json({
            success:false,
            message:"user is not found",
            error:err.message
        })
    })
}

module.exports.authenticate=(req,res,next)=>{
    passport.authenticate('local',(err,user,info)=>{
        if(err) return res.status(404).json(err);
        if(user) return res.status(200).json({
            "token":jwts.sign({id:user._id},
              "JWTAUTENTICATION",
              {
                  expiresIn:"20m"

              }),
              data:user
        })

       if(info) return res.status(401).json(info);
    })(req,res,next);
}


//userprofile
module.exports.userprofile=(req,res)=>{
    User.findOne({_id:req.params._id}).then((docs)=>{
        console.log(_id);
return res.status(200).json({
    success:true,
    message:'user found',
    data:docs
})
    })
.catch((err)=>{
    res.status(404).json({
        success:false,
     message:'user is not found',
     err:err.message

    })
})
}

var storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,__dirname+'/upload');
    },
    filename:(req,file,cb)=>{
      let ext = path.extname(file.originalname);
        cb(null,Date.now()+ ext);



    }
})

var upload = multer({storage:storage}).single('file');




module.exports.uploadingimage=(req,res)=>{
upload(req,res,(err)=>{
    if(err){
        console.log("there is error to upload the photo");
    }
    else{
        console.log('photo  upload is successfully');
        console.log(req.file.path)

        filepath = req.file.path;


}
})
}








