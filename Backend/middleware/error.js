const ErrorHander=require("../utils/errorhanders");

module.exports=(err,req,res,next)=>{
    err.statusCode=err.statusCode || 500;
    err.message=err.message || "Internal Server Error";

    //wrong mongodb id error
    if(err.name==="CastError"){
        const message=`Resource not found. Invalid: ${err.path}`;
        err=new ErrorHander(message,400);
    }

    //mongoose duplicate key error
    if(err.code===11000){
         const message=`Duplicate ${Object.keys(err.keyValue)} Enetered`;
         err=new ErrorHander(message,400);
    }
     //wrong JWT error
     if(err.name==="JsonWebTokenError"){
        const message=`Json web token is invalid, Try again`;
        err=new ErrorHander(message,400);
    }
     //JWT EXPIRE error
     if(err.name==="TokenExpiredError"){
        const message=`Json web token is expired, Try again`;
        err=new ErrorHander(message,400);
    }

    res.status(err.statusCode).json({
        success:false,
        message:err.message,
    });
};