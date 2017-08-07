"use strict";
const fortuneLib = require('../libs/fortune.js'),
      Post = require('../models/Post'),
	  User = require('../models/User'),
      Expat = require('../models/Expat'),
      postProxy = require('../db_proxy/post'),
      userProxy = require('../db_proxy/user'),
      coHandle = require('../common/coHandler'),
      expatMethod = require('../db_proxy/expat'),
      logger = require('../libs/logger');

module.exports = {

         home(req,res){
           coHandle(function*(){
                const user = req.user;
                let isExpat
                if(user){
                  isExpat = yield Expat.findOne({account: user._id}).exec();
                }
                
                // /console.log(JSON.stringify(isExpat))

                let expat = isExpat ? isExpat.processExpat(isExpat) : null;


                res.render('home/home', {
                        title: 'home page',
                        user: req.user ? req.user.processUser(req.user) : req.user,
                        expat: expat,
                        //postUser: req.user ? (req.user._id == user_id ? loginedUser : theuser) : theuser,
                        // posts: posts,
                        // page: page,
                        // isFirstPage: (page - 1) == 0,
                        // isLastPage: ((page - 1) * 10 + posts.length) == count,
                        messages: {
                            error: req.flash('error'),
                            success: req.flash('success'),
                            info: req.flash('info'),
                        }, // get the user out of session and pass to template
                });
           })
      
        },

        // about(req,res){
        //             res.render('home/about',{

        //                 pageTestScript: '/js/page-test/tests-about.js',//know which test file to be used in this route
        //                 messages: {
        //                     error: req.flash('error'),
        //                     success: req.flash('success'),
        //                     info: req.flash('info'),
        //                 },		        
        //                 user: req.user ? req.user.processUser(req.user) : req.user,
        //             });
        // },


        expatsData(req, res){
           coHandle(function*(){
                const page = req.query.p ? parseInt(req.query.p) : 1
                


                let query
                let fromCountry = req.query.fromCountry
                let choiceCity = req.query.choiceCity
                console.log('choiceCity'+choiceCity, fromCountry)
                if(fromCountry && choiceCity){
                    query = {
                        fromCountry: fromCountry,
                        choiceCity: choiceCity
                    }
                }else if(fromCountry) {
                    query = {
                        fromCountry: fromCountry,
                    }
                }else if(choiceCity) {
                    query = {
                        choiceCity: choiceCity
                    }
                }
                
                console.log('query'+JSON.stringify(query))
                let allExpatsCount = yield expatMethod.allExpatsCount(query)
                console.log(`all expats count: ${allExpatsCount}`)

                expatMethod.getExpats('exist_filter', page, (err, expats, count) => {
                    
                    if (err) {
                    logger.error(err.message)
                    throw new Error(err)
                    }
                    // let options = {
                    //  // user: req.user ? req.user.processUser(req.user) : req.user,
                    //   posts: posts,
                    //   page: page,
                    //   pageNumber: Math.ceil(count / 10),
                    //   isFirstPage: (page - 1) === 0,
                    //   isLastPage: (((page - 1) * 10) + posts.length) === count

                    //   // title: seo.home.title,
                    //   // keywords: seo.home.keywords,
                    //   // description: seo.home.description,
                    //   // messages: {
                    //   //   error: req.flash('error'),
                    //   //   success: req.flash('success'),
                    //   //   info: req.flash('info')
                    //   // }
                    // }
                // res.json(posts);
                    res.json({expats: expats, allExpatsCount: allExpatsCount})
                }, null, null, null, null, query)
           })
        },

        filter(req, res){
            coHandle(function*(){

                const from = req.body.fromCountry || null;
                const nowIn = req.body.choiceCity || null;
                
                logger.debug(`from: ${from}, nowIn ${nowIn}`)

                let expats
                if(from && nowIn) {
                  expats = yield Expat.find({fromCountry: from, choiceCity: nowIn}).exec();
                }else if(from){
                    expats = yield Expat.find({fromCountry: from}).exec();
                }else if(nowIn){
                    expats = yield Expat.find({choiceCity: nowIn}).exec();
                }else{
                    expats = yield Expat.find({}).exec();
                }



                logger.debug(`expats: ${JSON.stringify(expats)}`)

                res.render('home/home', {
                    title: 'home page',
                    user: req.user ? req.user.processUser(req.user) : req.user,
                    //postUser: req.user ? (req.user._id == user_id ? loginedUser : theuser) : theuser,
                    // posts: posts,
                    // page: page,
                    // isFirstPage: (page - 1) == 0,
                    // isLastPage: ((page - 1) * 10 + posts.length) == count,
                    messages: {
                        error: req.flash('error'),
                        success: req.flash('success'),
                        info: req.flash('info'),
                    }, // get the user out of session and pass to template

                    query: {
                      fromCountry: from,
                      choiceCity: nowIn                        
                    }
                })

            })

        }





};

