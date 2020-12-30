const {Admin} = require('../../database')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
    login: async(req,res)=>{
        const {username,password} = req.body
        const admin = await Admin.findOne({username})

        if(admin && bcrypt.compareSync(password,admin.password) ){
            const token = jwt.sign(admin.toObject(),process.env.JWT_SECRET,{expiresIn: '200d'})
            return res.json({admin,token})
        }
        res.status(401).json({msg:'wrong email or password'})
    },
    create: async(req,res)=>{
        const {username,password} = req.body
        const admin = await Admin.create({username,password:bcrypt.hashSync(password)})
        admin.save()
        return res.json({data:{admin}})
    }
}