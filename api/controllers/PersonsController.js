/**
 * PersonsController
 *
 * @description :: Server-side logic for managing persons
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
  /**
   * `PersonsController.index()` - List out all persons
   */
  index: function (req, res) {
    Persons.find(function(err, data){
      if(err)
        res.sendStatus(404);
      res.json(data);
    })
  },


  /**
   * `PersonsController.create()` - create a new person
   */
  create: function (req, res) {
    console.log("--------------->"+ req.body.firstName);
    var person1 = {
      "firstName": req.body.firstName,
      "lastName": req.body.lastName,
      "age": parseInt(req.body.age)
    };

    Persons.create(person1).exec(function(err){
      if(err)
        res.send(err);
      else
        res.json({"created_new_person": req.body.firstName});
    })
  },


  /**
   * `PersonsController.update()` - update a(only one) person with the given ID
   */
  update: function (req, res) {
    Persons.findOne({"id": req.params.Pid},function(err,data){
      if(err)
        res.send(err);
      else{
        data.firstName = req.body.firstName;
        data.lastName = req.body.lastName;
        data.age = req.body.age;

        data.save(function(err,data){
          if(err)
            res.send(err);
          else
            res.json({"updated": req.body.firstName});
        })
      }
    })
  },


  /**
   * `PersonsController.delete()` - delete a person with the given ID
   */
  delete: function (req, res) {
    Persons.destroy({"id": req.params.Pid}, function(err,data){
      if(err)
        res.send(err);
      else
        res.json({"deleted":data[0].firstName});
    });
    
  },


  /**
   * `PersonsController.show()` - show a(only one) person with the given ID
   */
  show: function (req, res) {
    Persons.find({"id": req.params.Pid}, function(err,data){
      if(err)
        res.send(err);
      else
        res.json(data);
    })
  }
};

