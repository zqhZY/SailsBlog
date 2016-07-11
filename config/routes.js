/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'homepage'
  },

  
  
  /**
   * user login to admin page
   * 
   */
  //login and register
  'post /register': 'UserController.register',
  'get /register': {view: 'users/register'},

  'get /login': {view: 'users/login'},
  'post /login': 'UserController.login',
  '/logout': 'UserController.logout',


  
  /****
   * admin routes
   *
   */
  'get /admin_home': {view: 'admin/admin_home'},
  
  //admin users
  'get /admin_user': {view: 'admin/admin_user'},
  'post /users.json': 'UserController.list',
  'post /delete.json': 'UserController.delete',

  //admin tags 
  'get /admin_tags': {view: 'admin/admin_tag'},
  'get /tag_create': {view: 'admin/tag_new'},
  'post /tag_create': 'TagsController.create',
  'post /tags.json': 'TagsController.list',
  'post /delete_tag.json': 'TagsController.delete',


  //admin posts

  'get /admin_posts': {view: 'admin/admin_post'},
  'get /post_create': {view: 'admin/post_new'},
  'post /post_create': 'PostController.create',
  'post /posts.json': 'PostController.list',
  'post /delete_post.json': 'PostController.delete',
  'post  /update_post.json': 'PostController.update',
  'post /update_view.json': 'PostController.updateview',

  
  
  
  
  'post /persons': 'PersonsController.create',
  'get /persons': 'PersonsController.index',
  'delete /persons/:Pid': 'PersonsController.delete',
  'put /persons': 'PersonsController.update',
  'get /persons/:Pid': 'PersonsController.show',
  'put /persons/:Pid': 'PersonsController.update',

  // 'post /post' : 'PostController.create',
  // 'get /post' : 'PostController.index'

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
