/**
 * PostController
 *
 * @description :: Server-side logic for managing Posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    index: function (req, res) {
        Post.find(function(err, data){
            if(err)
                res.sendStatus(404);
            res.json(data);
        })
    },
    
    create: function (req, res) {
        var post = {
            "title": req.body.title,
            "author": req.body.author,
            "imagePath": req.body.imagePath,
            "detail": req.body.detail,
            "Content": req.body.Content,
            "createtime": req.body.createtime
        };

        Post.create(post).exec(function(err){
            if(err){
                res.send(err);
            }
            else{
                return res.redirect('/admin_posts');
            }

        })
    },
    
    list: function (req, res) {
        var pages = {
            page: req.body.page,
            count: req.body.count
        };

        console.log('----------------->', pages);

        Post.find().exec(function (err, posts) {
            console.log('err----------------->', err);
            console.log('posts----------------->', posts);
            if (err)
                res.send(err);
            else
                res.send(posts);

        });
        
    },

    delete: function (req, res) {

        var postid = req.body.postid;

        console.log('posts------------->', postid);
        Post.destroy({id:postid}).exec(function (err){
            if (err) {
                return res.negotiate(err);
            }
            sails.log('Any post named Finn have now been deleted, if there were any.');
            return res.ok();
        });
    }
	
};

