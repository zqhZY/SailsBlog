/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var passport = require('passport');

module.exports = {

    _config: {
        actions: false,
        shortcuts: false,
        rest: false
    },

    /**
     * `UserController.register()` - create a new user
     */

    register: function (req, res) {
        var user = {
            "username": req.body.username,
            "email": req.body.email,
            "password": req.body.password
        };

        User.create(user).exec(function(err){
            if(err)
                res.send(err);
            else
                res.json({"result": "success"});
        })
    },




    login: function(req, res) {
        passport.authenticate('local', function(err, user, info) {
            if ((err) || (!user)) {
                return res.send({
                    message: info.message,
                    user: user
                });
            }
            req.logIn(user, function(err) {
                if (err) res.send(err);
                return res.send({
                    message: info.message,
                    user: user
                });
            });

        })(req, res);
    },

    logout: function(req, res) {
        req.logout();
        res.redirect('/');
    }

};

