 import mongoose from"mongoose";
import colors from "colors";


  export const connectDB= async()=>
    
    {
        try
        {

        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`server is connected to the mongodb ${mongoose.connection.host}`);
        
        console.log("Connected DB:", mongoose.connection.name);

    }catch(error)
    {
        console.log(`mongodb error ${error}`)
    }
}
 

