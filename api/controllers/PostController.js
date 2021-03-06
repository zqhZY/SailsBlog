/**
 * PostController
 *
 * @description :: Server-side logic for managing Posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var markdown = require('markdown-js');
var url = require('url');
var path = require('path');

module.exports = {

    index: function (req, res) {
        Post.find(function(err, data){
            if(err)
                res.sendStatus(404);
            res.json(data);
        })
    },
    
    create: function (req, res) {

        var content_md = markdown.makeHtml(req.body.Content);

        var filename = req.file('imagePath');
        filename.upload({
            dirname: path.resolve(sails.config.appPath, 'assets/images')
        },function (err, uploadedFiles) {
            if (err) return res.negotiate(err);

            var imagepath = path.relative(sails.config.appPath+'/assets', uploadedFiles[0].fd);

            var post = {
                "title": req.body.title,
                "author": req.body.author,
                "imagePath": imagepath,
                "detail": req.body.detail,
                "Content": content_md,
                "createtime": req.body.createtime
            };

            console.log(post);

            Post.create(post).exec(function(err){
                if(err){
                    res.send(err);
                }
                else{
                    return res.redirect('/admin_posts');
                }

            })

        });
        // // res.send(content_md);
        // var post = {
        //     "title": req.body.title,
        //     "author": req.body.author,
        //     "imagePath": req.body.imagePath,
        //     "detail": req.body.detail,
        //     "Content": content_md,
        //     "createtime": req.body.createtime
        // };
        //
        // Post.create(post).exec(function(err){
        //     if(err){
        //         res.send(err);
        //     }
        //     else{
        //         return res.redirect('/admin_posts');
        //     }
        //
        // })
    },
    
    list: function (req, res) {
        var pages = {
            page: req.body.page,
            count: req.body.count
        };

        Post.find().exec(function (err, posts) {
            if (err)
                res.send(err);
            else
                res.send(posts);

        });
        
    },

    showpost: function (req, res) {
        var arg = url.parse(req.url, true).query;
        var post_id = arg.id;
        console.log('------>', post_id);

        Post.find({id: post_id}).exec(function (err, post) {
            if (err)
                res.send(err);
            else
                res.view('content/content', {post: post});
        });
    },

    delete: function (req, res) {

        var postid = req.body.postid;

        console.log('delete postid------------->', postid);
        Post.destroy({id:postid}).exec(function (err){
            if (err) {
                return res.negotiate(err);
            }
            sails.log('Any post named Finn have now been deleted, if there were any.');
            return res.redirect('/admin_posts');
        });
    },

    updateview: function (req, res) {

        var postid = req.body.postid;

        console.log('updateview posts------------->', postid);

        Post.find({id: postid}).exec(function (err, post) {
            // console.log('posts----------------->', post);
            if (err)
                res.send(err);
            else
                res.view('admin/post_update', {updatepost: post});


        });
    },

    update: function (req, res) {

        var postid = req.body.postid;
        console.log('update postids------------->', postid);

        var post = {
            "title": req.body.title,
            "author": req.body.author,
            "imagePath": req.body.imagePath,
            "detail": req.body.detail,
            "Content": req.body.Content,
            "createtime": req.body.createtime
        };

        Post.update({id:postid}, post).exec(function (err){
            if (err) {
                return res.negotiate(err);
            }
            sails.log('Any post named Finn have now been update, if there were any.');
            return res.redirect('/admin_posts');
        });

    }
	
};

