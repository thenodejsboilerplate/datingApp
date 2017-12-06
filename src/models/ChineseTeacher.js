//./models/User.js
"use strict";
const mongoose = require('mongoose'),
      User = require('../models/User'),
      moment = require('moment'),
      coHandle = require('../common/coHandler'),
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
var ChineseTeacherSchema = new Schema({ 
          //name: String,
    //  user_id: { type: String, required: true }, 
     id: String,//for tags
     account: {
        type: Schema.Types.ObjectId,
        ref:'User',        
     },
     name: { type: String, required: true},
     //email: { type: String, required: true},
    //  college: { type: String, required: true},
     experience: {type: String, required: true},
     charge: {type: Number, default: 0},
     
     phone: { 
         type: String, 
         required: true
        //  validate: {
        //      validator: function(v){
        //          return /\d{10-12}/.test(v);
        //      },
        //      message:'{VALUE} is not a valid phone number!'
        //  },
        //  required: [true, 'Phone Number required!'],

    },
    wechat: String,

    //  choiceCountry: {type: String,required: true},
     choiceState: {type: String,required: true},
     choiceCity: {type: String,required: true},
     fromCountry: {type: String,required: true},
     fromState: {type: String,required: true},
    // status: {type: String,required: true},
     nativeLanguage: {type: String,required: true},
     secondaryLanguage: {type: String,required: true},
     hangout: {type: String, required: true},
    // coin: {type: Number, default: 0},

     inService: { type: String, default: false}
}, {timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}});

// userSchema.methods.time = time=> {
//     return moment(time).format('L');
// };


// User.find({}).count({}, function(err,count){
//     expatSchema.pre('save', function(next) {
//         let tag = 0;
//         let expat = this;
        

//             tag = count + 1;
//             expat.id = tag;
//             next();


//         // User.find({}, function(err, users) {
//         //    if (err) throw err;
            
//         //     tag = users.length + 1;
//         //     auser.id = tag;
//         //     next();
//         // });
//     }); 
// })

// expatSchema.pre('save', function(next) {
//     let tag = 0;
//     let expat = this;
    
//     coHandle(function*(){
//         const count = yield User.count({}).exec();
//         tag = count + 1;
//         expat.id = tag;
//         next();
//     })

//     // User.find({}, function(err, users) {
//     //    if (err) throw err;
        
//     //     tag = users.length + 1;
//     //     auser.id = tag;
//     //     next();
//     // });
// });



ChineseTeacherSchema.methods.processChineseTeacher = user=>{
    return {
        _id: user._id,
        id: user.id,
        name: user.name,
        phone: user.phone,
        wechat: user.wechat,
        experience: user.experience,
        choiceState: user.choiceState,
        choiceCity: user.choiceDetail,
        fromCountry: user.fromCountry,
        fromState: user.fromState,
        charge: user.charge,
        nativeLanguage: user.nativeLanguage,
        secondaryLanguage: user.secondaryLanguage,
        hangout: user.hangout,
       // coin: user.coin,
        //age: user.age,

        inService: user.inService,
        created_at: moment(user.created_at).format('L'),
        updated_at: moment(user.updated_at).format('L')

    };
};

// make this available to our users in our Node applications
module.exports = mongoose.model('ChineseTeacher', ChineseTeacherSchema);