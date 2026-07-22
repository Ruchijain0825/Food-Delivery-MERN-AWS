import mongoose from "mongoose";
const AdminScheme = new mongoose.Schema({
    email:
    {
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        unique:true
    }
    password:
    {
        type:String,
        required:true
    }
},timestamps:true)
const AdminModel = mongoose.models.Admin||mongoose.model("Admin",AdminScheme);
export default AdminModel;