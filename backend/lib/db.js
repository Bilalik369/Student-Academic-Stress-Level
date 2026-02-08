import mongoose from "mongoose";


export const connectdb = async ()=> {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connexion avec base de donnes")
    } catch (error) {
        console.log("error de connexion avec base de donnees")
        process.exit(1)
        
    }
}