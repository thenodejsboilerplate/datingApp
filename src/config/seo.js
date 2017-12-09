/**
 * config
 */

var path = require('path');

var config = {

  home: {
    title: '外语学习社区',
    keywords: '英语,法语,日语,德语,中文,语言学习,外国人聚会,国外交流生,Language Exchange,Languge Meetup,Meetup,聚会,口语聚会',
    description: '专业的外语学习社区，提供完善的语言学习解决方案，包括外语论坛,外教及外语中教信息分享，线上线下口语聚会等'
  },

  user: {
    signup: {
      title: '注册页面',
      keywords: '英语，法语，日语，德语，中文，外国人聚会，学习计划，学习路径，国外交流生注册学习',
      description: '语言学习注册'
    },
    login: {
      title: '登录页面',
      keywords: '英语，法语，日语，德语，中文，外国人聚会，学习计划，学习路径，国外交流生登录学习',
      description: '语言学习登录'
    },
    profile: {
      title: '私教/外教信息',
      keywords: '英语,法语,德语,西班牙语,葡萄牙语,中文,日语等外教教员信息',
      description: '外教信息及联系方式'
    },
    resetPw: {
      title: 'Reset Your Password and Information',
      keywords: '重置密码和信息',
      description: '重置您的密码和信息'
    },
    userUpdate: {
      title: 'Update your information',
      keywords: '更新您的信息,更新',
      description: '更新外教/英语老师信息'
    }
  },

  expat:{
    uploadID: {
      title: 'UPLOAD YOUR INFO',
      keywords: 'upload your information,提交您的信息！',
      description: 'upload your information like visa, any kind of license that will help you to get a better teaching job'
    },
  },

  form: {
    toBeTutor: {
      title: 'To Be a Tutor',
      keywords: '成为外语老师,English Teacher,Japanese Teacher,French Teacher,Spanish Teacher,German Teacher',
      description: 'Join us and be a part-time English teacher/Tutor; 加入我们，成为外语老师...'
    }
  }


};

module.exports = config;
