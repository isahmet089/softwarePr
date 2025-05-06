const mongoose =require("mongoose");
require("dotenv").config();
const MONGO_URI=process.env.MONGO_URI || "mongodb+srv://fatih123640:XYtaB1n9BStxNQow@cluster1.7jhqj.mongodb.net/testDers";



const connectMangoDB = async ()=>{
    try {
        const conn = await mongoose.connect(MONGO_URI);
        console.log(`Mongo db bağlantısı başarılı  ${conn.connection.host}`);
    } catch (error) {
        console.log(`MongoDB bağlantısı başarısız ${error.message}`);
        
    }
};

module.exports=connectMangoDB;