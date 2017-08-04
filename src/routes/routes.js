// app/frontend.js
"use strict";
const user = require('./frontend/user'),
      // test = require('./frontend/test'),
	  respond = require('./frontend/respond'),
	  login3 = require('./frontend/login3'),
	  index = require('./frontend/index'),
	  expat = require('./frontend/expat'),
	  post = require('./frontend/post');

// const User = require('../models/User');
// const passport = require('passport');

module.exports   = function(app, passport, User) {
	 app.use('/',index);  
	 app.use('/response',respond);   
	 app.use('/user',user(app,User,passport));
	 // app.use('/api',api);
	 app.use('/auth',login3);
     app.use('/post', post);
	 app.use('/expat',expat);

		//to get form data using req.body
		/*****form part end********/
};
