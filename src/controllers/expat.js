'use strict';
const logger = require('../libs/logger');
const Expat = require('../models/Expat');
const Upload = require('../models/Upload');
const User = require('../models/User');

const coHandle = require('../common/coHandler');
const config = require('../common/get-config');
const helper = require('../libs/utility');
const formidable = require('formidable');


module.exports = {

    getExpatInfo(req, res){
        if (!req.user) {
            logger.debug(`Please login!`);
            return res.redirect('/user/login');
        } else {

            
           return coHandle(function*(){
                const user = req.user;
                let isExpat = yield Expat.findOne({account: user._id}).exec();
                // /console.log(JSON.stringify(isExpat))

                let expat = isExpat ? isExpat.processExpat(isExpat) : null;
                // if(isExpat){
                //     // Expat.find({}).populate('account').exec(function(err,expats){
                //         let expat = isExpat
                // }
                res.render('form/expatInfo', {
                        user: user ? user.processUser(user) : user,
                        // title:seo.desktop.courses.book.title,
                        // keywords:seo.desktop.courses.book.keywords,
                        // description:seo.desktop.courses.book.description,  
                        expat: isExpat,
                        messages: {
                            error: req.flash('error'),
                            success: req.flash('success'),
                            info: req.flash('info'),
                        }, // get the user out of session and pass to template
                }); 



            })

        }
            
    },



    postExpatInfo(req, res) {
                        let user = req.user.processUser(req.user);
                        let fields = req.body;
                        logger.debug(`fields is: ${JSON.stringify(fields)}`);

                        fields._csrf = null;
                        fields.account = user._id;//populate

                        fields.id = user.tag[0];
                        let expat = new Expat(fields);

                        logger.debug(`fields is: ${JSON.stringify(fields)} EXPATS is ${JSON.stringify(expat)}`);

                        expat.save(function(err,aexpat){
                                if(err){
                                    logger.error(`error when saving expat form : ${err.stack?err.stack:err.message}`);
                                    //throw new Error(`error when saving data`);
                                        return res.redirect('back');
                                    
                                }else{
                                    coHandle(function*(){
                                        let auser = yield User.findOne({_id: user._id}).exec();
                                        auser.expat = expat._id;
                                        yield auser.save();
                                        req.flash('success','Success!');
                                        res.redirect('/expat/expatUpload')
                                    })

                                    //res.redirect(`/courses/profile?user_id=${auser.user_id}`);
                                }
                        });
    },


    expatProfile(req, res) {
        coHandle(function * () {
            const id = req.query.id
            const user = req.user ? req.user.processUser(req.user) : req.user;
            const expat = yield Expat.findOne({_id: id}).populate('account').exec();

            let upload = null;
            if(expat){
              
              upload = yield Upload.findOne({user_id: expat.account._id}).exec();
              logger.debug('upload: '+ JSON.stringify(upload));

            }

            let charge =  expat.charge;
            let coinLeft = 0;

            if(user){
              coinLeft =  user.coin;
            }

            
            let coinNotEnough = false;
            if(charge > coinLeft) {
                coinNotEnough = true;
            }
            
           // console.log('expatss <br>' + JSON.stringify(expats))
            res.render('expats/profile',{
                user: user,
                expat: expat,
                upload: upload,
                coinNotEnough: coinNotEnough,
                // title:seo.desktop.courses.book.title,
                // keywords:seo.desktop.courses.book.keywords,
                // description:seo.desktop.courses.book.description,  
                messages: {
                    error: req.flash('error'),
                    success: req.flash('success'),
                    info: req.flash('info'),
                }, // get the user out of session and pass to template

                
            })

        })
    },




    expatUpload(req, res){
        const user = req.user;
        if(user){
            res.render('form/expatImgUpload', {
                user: user ? user.processUser(user) : user,
                // expat: expat,
                // title:seo.desktop.courses.book.title,
                // keywords:seo.desktop.courses.book.keywords,
                // description:seo.desktop.courses.book.description,  
                messages: {
                    error: req.flash('error'),
                    success: req.flash('success'),
                    info: req.flash('info'),
                }, // get the user out of session and pass to template
            })
        }
    },

    expatUploadPost(req, res){

                let dataDir = config.uploadDir;
                logger.debug('dataDir is '+ dataDir);

                let photoDir;
                    photoDir = dataDir + 'expat/';
                helper.checkDir(dataDir);
                helper.checkDir(photoDir);	
                const form = new formidable.IncomingForm(); 
                
                form.multiples = true;
             
                logger.debug('into the getData Func');
                form.parse(req,(err,fields,files) => {
                    if(err){
                        logger.error(`err when form.parse: ${JSON.stringify(err)}, ${err.stack}`);
                        return res.redirect('back');
                    }
                    logger.debug('into the formparse cb. files'+JSON.stringify(files)+ `fields ${fields}`);

                    // let names = [];
                    if(Array.isArray(files.personal)){
                        files.personal.forEach(function(v,i,e){
                        v.name ? helper.processImg(v, photoDir,5*1024*1024,files, req, res) : logger.debug('personal img not uploaded.skipping..');
                        })
                    }else{
                        files.personal.name ? helper.processImg(files.personal, photoDir,5*1024*1024,files, req, res) : logger.debug('personal img not uploaded.skipping..');  
                    }

                    files.id.name ? helper.processImg(files.id, photoDir,5*1024*1024,files, req, res) : logger.debug('id img not uploaded.skipping..')
                    files.studentCard.name ? helper.processImg(files.studentCard, photoDir,5*1024*1024,files, req, res) : logger.debug('studentCard img not uploaded.skipping..')
                    // processImg(files.id, photoDir,5*1024*1024, req, res);
                    // processImg(files.studentCard, photoDir,5*1024*1024, req, res);
                    // processImg(files.studentsCertificate);
                //   if(files.drivePermit){
                //       processImg(files.drivePermit);

                //   }
                    
                    //  processImg(files.personal);
                    console.log(`file.personal: ${JSON.stringify(files.personal)}`);


                    //   for(let i=0,length=files.personal.lenth;i<length;i++){
                    //       processImg(files.personal[i]);
                    //   }
                    
                    let user = req.user.processUser(req.user);
                    coHandle(function*(){
                        const user = req.user;
                        // let expat = yield Expat.findOne({account: user._id}, {_id: 1}).exec();
                        let upload = new Upload({
                            user_id: user._id,

                            id: files.id ? files.id.name : null,
                            studentCard: files.studentCard ? files.studentCard.name : null,
                            
                        });
                        
                        if(files.personal){
                            files.personal.forEach(function(v){
                               upload.personal.push(v.name)
                            })
                        }

                        logger.debug(`fields is: ${JSON.stringify(upload)}`);

                        upload.save(function(err,aupload){
                                if(err){
                                    logger.error(`error when saving expat form : ${err.stack?err.stack:err.message}`);
                                    //throw new Error(`error when saving data`);
                                    return res.redirect('back');
                                    
                                }else{
                                    logger.debug(`upload is: ${JSON.stringify(aupload)}`);
                                    coHandle(function*(){
                                        let auser = yield User.findOne({_id: user._id}).exec();
                                        auser.upload = aupload._id;
                                        yield auser.save();
                                    })
                                    req.flash('success','Uploaded!');
                                    res.redirect(`/`);
                                }
                        });


                    })

                          
                    

                                    
                });//form.parse           




    },

    uploadJson(req, res){
        //const user = req.user ? req.user : req.user.processUser(req.user)
        //if()
       /// User.findOne({})

    }

};


    
    
