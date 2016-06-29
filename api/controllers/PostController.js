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
        console.log("--------------->"+ req.body.title);
        var post = {
            "firstName": req.body.title
        };

        Post.create(post).exec(function(err){
            if(err)
                res.send(err);
            else
                res.json({"created_new_person": req.body.title});
        })
    }
	
};

