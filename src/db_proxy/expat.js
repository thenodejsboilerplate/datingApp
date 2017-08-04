const config = require('../common/get-config')
const co = require('co')
const ExpatModel = require('../models/Expat')
const logger = require('../libs/logger')
module.exports = {

  secureExpats: (expats) => {
    expats = expats.map(function (expat) {
      return expat.processExpat(expat)
    })
    return expats
  },
  allExpatsCount: (query)=>{
    return co(function*(){
      let count = yield ExpatModel.count(query).exec()
      return Promise.resolve(count)
    })
  },
    /**
     * get 10 posts per page
     * Callback:
     * - err, error
     * - posts, posts per page
     * @param {variable} name
     * @param {Number} page :fetch from the url ..?p=..
     * @param {Function} callback
     */

  getExpats: function (name, page, callback, ...args) {
    let query
    const self = this
    const topicCount = config.TOPIC_COUNT

    if (name) {
      if (args[0]) {
        query.tag_id = name
      } else if (args[1]) {
        query.title = name
      } else if (args[2]) {
        query.user_id = name
      } else if (args[3]) {
        query.group_id = name
      } else if (args[4]) {
        query = args[4]
        logger.debug('query' + JSON.stringify(query))
      }
      // console.log(`query[${name}] is`+ Object.keys(query));
    }
    co(function * () {
      const count = yield ExpatModel.count(query).exec()
      if(count === 0) {
        return callback(null, [], count)
      }
      let expats
      try {
        expats = yield ExpatModel.find(query).skip((page - 1) * topicCount).limit(topicCount).sort({'updated_at': -1}).exec()

        expats = self.secureExpats(expats)
      } catch (err) {
        logger.error(`no posts found: ${err}`)
      }
      callback(null, expats, count)
    })
    .catch(function (err) {
      return callback(err.message ? err.message : err)
    })
            // Post.find(query,{
            //     skip: (page-10)*10,
            //     limit:10,
            //     sort:{
            //        'created_at':-1
            //     },
            // },function。。);
  }
}
