const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    companyName:{
        type:String,
        required:true
    },
    jobTitle:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    salary:{
        type:String,
        required:true
    },
    logoUrl:{
        type:String,
        required:true
    },
    duration:{
        type:String,
        required:true
    },
    locationType:{
        type:String,
        required:true
    },
    information:{
        type:String,
        required:true
    },
    jobType:{
        type:String,
        required:true
    },
    skills:{
        type:Array,
        required:true
    },
    refUserId:{
        type:mongoose.ObjectId,
    }

},
{
    timestamps:{
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
}
);

module.exports = mongoose.model('Job', jobSchema);