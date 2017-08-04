//./models/Post.js
// grab the things we need
"use strict";
const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      User = require('../models/User'),
      Expat = require('../models/Expat'),
      moment = require('moment');

// create a schema
//The allowed SchemaTypes are:
// String
// Number
// Date
// Buffer
// Boolean
// Mixed
// ObjectId
// Array
var complaintSchema = new Schema({
          whoComplain: {
            type: Schema.Types.ObjectId,
            ref:'User',        
          },
          beingComplained: {
            type: Schema.Types.ObjectId,
            ref:'Expat',        
          },
          falseInfo: { type: String},
          fraud: { type: String},
          complaint: { type: String},//,match: /[0-9a-zA-Z_-]/
}, {timestamps: true});


complaintSchema.methods.time = time=> {
    return moment(time).format('L');
};

complaintSchema.methods.processComplaint = complaint=>{
    return {
        _id:comment._id,
        whoComplain: complaint.whoComplain,
        expat: complaint.expat,
        falseInfo: complaint.falseInfo,
        fraud: complaint.fraud,   
        complaint: complaint.complaint,      
        created_at: comment.time(comment.created_at),
        updated_at: comment.time(comment.updated_at),     
    };
};




// make this available to our users in our Node applications
module.exports = mongoose.model('Complaint', complaintSchema);