'use strict';
const logger = require('../libs/logger');
module.exports = {
			// route middleware to make sure a user is logged in
  isLoggedIn: (req, res, next)=> {

        // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()){ 
      return next();
    }else{
      req.flash('error','Please Login!');
				// if they aren't redirect them to the home page
      res.redirect('/user/login');
    }

  },

  notLoggedIn: (req, res, next)=> {

        // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()){
      req.flash('error','Already on board!');
            // if they aren't redirect them to the home page
      res.redirect('back');
    }else{
      return next();
    }

  },
		/***
		 * @params: Array
		 */
  allow: (roles)=> {
    return function(req,res,next){
      if(req.user){
        let user      = req.user.processUser(req.user);
        let roleExist = roles.some(function(v){
          return user.roles.join(',').includes(v);
        });
						// let roleExist = roles.split(',').every(function(v){
							
						// 	user.roles.indexOf(v) !== -1;

						// });
        if(roleExist){
          logger.debug('');
          return next();
        }else{
          req.flash('error','VIP required！');
          res.redirect('back');//unauthorized							
        }
      }else{
						//next('route');
        req.flash('error','Please Login！');
        res.redirect(303,'/user/login');//unauthorized
      }				
    };

			
  },
		
}; 