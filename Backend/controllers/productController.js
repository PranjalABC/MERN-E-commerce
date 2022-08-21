const Product=require("../models/productModels");
const ErrorHander = require("../utils/errorhanders");
const catchAsyncErrors=require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");
const { query } = require("express");
const _ = require("lodash");

//Create Product --Admin    

exports.createProduct =catchAsyncErrors(async(req,res,next)=>{

    req.body.user=req.user.id;

    const product =await Product.create(req.body);
    res.status(201).json({
        success:true,
        product 
    });
});
//Get all products

exports.getAllProducts=catchAsyncErrors(async(req,res)=>{

    const resultPerPage=8;
    const productsCount=await Product.countDocuments();
    const apiFeature=new ApiFeatures(Product.find(),req.query)
    .search()
    .filter()
    let products = await apiFeature.query;

  let filteredProductsCount = products.length;

  apiFeature.pagination(resultPerPage);

  products = await apiFeature.query.clone();    
    res.status(200).json({
        success:true,
        products,
        productsCount,
        resultPerPage,
        filteredProductsCount,
    });
});

//Get Product details

exports.getProductDetails=catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.params.id);
    

    if(!product){
        return next(new ErrorHander("Product not found",404));
    }
    res.status(200).json({
        success:true,
        product,
    });
});

//update a product--admin
exports.updateProduct=catchAsyncErrors(async(req,res,next)=>{
    let product=await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHander("Product not found",404));
    }
    product=await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });
    res.status(200).json({
        success:true,
        product  
    });
    
});
//Delete a prooduct

exports.deleteProduct=catchAsyncErrors(async(req,res,next)=>{
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHander("Product not found",404));
    }
    await product.remove();
    res.status(200).json({
        success:true,
        message:"Product Deleted Sucessfully"
    });
});

//Create new review or update the review
exports.createProductReview=catchAsyncErrors(async(req,res,next)=>{
const{rating,comment,productId}=req.body;
    const review={
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment,

    };
    const product =await Product.findById(productId);
    const isReviewed=product.reviews.find((rev)=> rev.user.toString()===req.user._id.toString());
    if(isReviewed){
        product.reviews.forEach((rev)=>{
            if(rev.user.toString()===req.user._id.toString())
            (rev.rating=rating),
            (rev.comment=comment)
        });
    }
    else{
        product.reviews.push(review);
        product.numOfReviews=product.reviews.length;
    }

    let avg=0,sum=0,count=0;
    product.reviews.forEach((rev)=>{
        // avg = avg + rev.rating;
        sum = sum + parseInt(rev.rating);
        count++;
        });

        avg = sum/count;
        product.ratings = avg;
       

    await product.save({validateBeforeSave:false});

    res.status(200).json({
        success:true,
    }); 
});

//Get all reviews of a product
exports.getProductReviews=catchAsyncErrors(async(req,res,next)=>{
    const product =await Product.findById(req.query.id)

    if(!product){
        return next(new ErrorHander("Product not found",404));
    }

    res.status(200).json({
        success:true,
        reviews:product.reviews,
    });
});

//Delete review
exports.deleteReview=catchAsyncErrors(async(req,res,next)=>{
    const product =await Product.findById(req.query.productId)

    if(!product){
        return next(new ErrorHander("Product not found",404));
    }

    const reviews=product.reviews.filter(
        (rev)=>rev._id.toString() !== req.query.id.toString()
    );

    let avg=0,sum=0,count=0;
    reviews.forEach((rev)=>{
        // avg = avg + rev.rating;
        sum = sum + parseInt(rev.rating);
        count++;
        });

        avg = sum/count;
        const ratings = avg;
        const numOfReviews=reviews.length;

    await Product.findByIdAndUpdate(
        req.query.productId,
        {
            reviews,
            ratings,
            numOfReviews,
        },
        {
            new:true,
            runValidators:true,
            useFindAndModify:false,
        }
    );

    res.status(200).json({
        success:true,
    });
});