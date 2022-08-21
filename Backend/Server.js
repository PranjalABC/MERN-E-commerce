const app=require("./App");

const dotenv =require("dotenv");

const connectDatabase=require("./config/database")
//handling uncaught exception
process.on("uncaughtException",()=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to uncaught exception`);
    process.exit(1);
})

//config
dotenv.config({path:"Backend/config/config.env"});

//connecting to database
    
connectDatabase();

const server=app.listen(process.env.PORT,()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

//unhandled promise rejection 
process.on("unhandled rejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandles promise rejection`);
    server.close(()=>{
        process.exit(1);
    });
})