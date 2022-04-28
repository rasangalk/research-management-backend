const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
        min: 3,
        max: 20
    },

    role: {
        type: String,
        required:true,
        enum: ['student','supervisor','staff']
    },

    hash_password: {
        type: String,
        required: true,
    },

    re_hash_password: {
        type: String,
        required: true,
    },

    fullName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 30
    },

    sliit_id: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },

    phone: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },

    specialization: {
        type: String,
        enum: ['SE','CSNE','DS', 'ISE', 'CS']
    },

    research_interest: {
        type: String,
        enum: ['AI','AB','CD', 'EF', 'GH']
    },

    subject: {
        type: String,
        enum: ['AQ','BQ','CQ', 'EQ', 'GQ']
    },

}, {timestamps:true });


//This is created to compare the password(DB password and user enterd password)
userSchema.methods = {
    authenticate:async function(password){
        return await bcrypt.compare(password,this.hash_password);
    }
}

module.exports = mongoose.model('User',userSchema);