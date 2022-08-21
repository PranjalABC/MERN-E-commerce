import axios from "axios";
import {ALL_PRODUCT_FAIL,ALL_PRODUCT_REQUEST,ALL_PRODUCT_SUCCESS, PRODUCT_DETAILS_FAIL,PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCCESS,CLEAR_ERRORS} from "../constants/productConstants";

export const getProduct =(keyword="",currentPage=1,price,category,ratings=0)=>async(dispatch)=>{
    try {
        dispatch({type:ALL_PRODUCT_REQUEST});
        let link;
        if(!keyword.keyword&&price&&!category){
        link=`/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;}
        else if(!keyword.keyword&&price&&category){
            link=`/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;}
        else if(keyword.keyword&&price&&!category){
            link=`/api/v1/products?keyword=${keyword.keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
        }
        else if(keyword.keyword&&price&&category){
            link=`/api/v1/products?keyword=${keyword.keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
        }
        else {  
            link=`/api/v1/products`;
        }

        const {data}=await axios.get(link);
        console.log(data);

        dispatch({
            type:ALL_PRODUCT_SUCCESS,
            payload:data,
        })
    } catch (error) {
        dispatch({
            type:ALL_PRODUCT_FAIL,
            payload:error.response.data.message
        });
    }
};


export const getProductDetails =(id)=>async(dispatch)=>{
    try {
        dispatch({type:PRODUCT_DETAILS_REQUEST});

        const {data}=await axios.get(`/api/v1/product/${id}`);
        console.log(data);

        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data,
        })
    } catch (error) {
        dispatch({
            type:PRODUCT_DETAILS_FAIL,
            payload:error.response.data.message
        });
    }
};

export const clearErrors =()=>async(dispatch)=>{
    dispatch({type:CLEAR_ERRORS})
}