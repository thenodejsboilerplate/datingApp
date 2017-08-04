//./models/User.js
"use strict";
const mongoose = require('mongoose'),
     // helper = require('../lib/utility'),
      //logger = require('../lib/logger'),
      Expat = require('./Expat'),
      moment = require('moment'),
      Schema = mongoose.Schema;

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
var uploadSchema = new Schema({ 

     user_id: String,

     id: { type: String},
     studentCard: { type: String},   
     personal: [String], 
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});

// userSchema.methods.time = time=> {
//     return moment(time).format('L');
// };


uploadSchema.methods.processUpload = img =>{
    return {
        _id: img._id,
    
        id: img.id ? img.id : null,
        expat: img.expat,
        studentCard: img.studentCard ? img.studentCard : null,
        personal: img.personal ? img.personal : null,

        created_at: moment(img.created_at).format('L'),
        updated_at: moment(img.updated_at).format('L')
    };
};

// make this available to our users in our Node applications
module.exports = mongoose.model('Upload', uploadSchema);