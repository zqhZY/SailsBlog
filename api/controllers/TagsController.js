/**
 * TagsController
 *
 * @description :: Server-side logic for managing Tags
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    create: function (req, res) {
        console.log('------------------>', req.body.tagname);
        var tag = {
            tagname: req.body.tagname
        }

        Tags.create(tag).exec(function(err){
            if(err)
                res.send(err);
            else
                return res.redirect('/admin_tags');
        })

    },

    list: function (req, res) {
        var pages = {
            page: req.body.page,
            count: req.body.count
        };

        console.log('----------------->', pages);

        Tags.find().exec(function (err, tags) {
            console.log('err----------------->', err);
            console.log('tags----------------->', tags);
            if (err)
                res.send(err);
            else
                res.send(tags);

        });
    },

    updateview: function(req, res){

        var tagid = req.body.tagid;

        console.log('tagid-------------->', tagid);
        Tags.find({id: tagid}).exec(function(err, tag){

            if (err)
                return err
            else
                res.view('admin/tag_update', {updatetag: tag});
        })
    },


    update: function(req, res){

        var tagid = req.body.tagid;
        console.log('update postids------------->', tagid);

        var tag = {
            "tagname": req.body.tagname
        };

        Tags.update({id:tagid}, tag).exec(function (err){
            if (err) {
                return res.negotiate(err);
            }
            sails.log('Any tag named Finn have now been update, if there were any.');
            return res.redirect('/admin_tags');
        });
    },

    delete: function (req, res) {

        var tagid = req.body.tagid;

        console.log('tagsid------------->', tagid);
        Tags.destroy({id:tagid}).exec(function (err){
            if (err) {
                return res.negotiate(err);
            }
            sails.log('Any tag named Finn have now been deleted, if there were any.');
            res.redirect('/admin_tags');
        });
    }
	
};

