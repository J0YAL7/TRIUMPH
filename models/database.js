const mongoose=require('mongoose');

const database = "mongodb://127.0.0.1:27017/TRIUMPH";
console.log(database);
const mongodb=async ()=>{
    try{
        await mongoose.connect(database);
        console.log("MongoDB Connected");
    }

catch(err){
    console.log("Failed to Connected due to",err.message);

}
}
module.exports=mongodb;