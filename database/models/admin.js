const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    __v:{type: Number,select:false}

})

AdminSchema.set('toJSON', {
    transform: function(doc, ret, options) {
        delete ret.password;
        return ret;
    }
});

const Admin = mongoose.model('Admin',AdminSchema)

module.exports = {Admin,AdminSchema}