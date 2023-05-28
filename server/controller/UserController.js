const mongoose = require('mongoose')
const User = require("../models/User")

const findUser = async (req,res)=>{
    try{
        const user = await User.findById(new mongoose.Types.ObjectId(req.params.id))
        if(!user){
            return res.status(404).json({message: "User not found"})
        }
        return res.status(200).json({
            _id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
        })
        console.log(user)

    } catch (err) {
        console.log("Error: " + err)
        return res.status(500).json(err)
    }
}

const findUsers = async (req,res)=>{
   
    try{
        const users = await User.find()
        if(!users){
            return res.status(404).json({message: "User not found"})
        }
        
        return res.status(200).json(users)
    } catch (err) {
        console.log("Error: " + err)
        return res.status(500).json(err)
    }
}
const deleteUser = async (req,res)=>{
    console.log(req.params.id)
    try{
        const user = await User.findById(new mongoose.Types.ObjectId(req.params.id))
        if(!user){
            return res.status(404).json({message: "User not found"})
        }
        user.remove();
        return res.status(200)
    } catch (err) {
        console.log("Error: " + err)
        return res.status(500).json(err)
    }
} 
module.exports = { findUser, findUsers, deleteUser };
