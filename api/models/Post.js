/**
 * Post.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    
    title : {
      type: 'string'
    },

    author: {
      type: 'string'
    },

    imagePath: {

      type: 'string'
    },

    detail: {
      type: 'string'
    },

    Content: {

      type: 'text'
    },

    createtime:{
      type: 'string'
    }

  }
};

