Persons = new Mongo.Collection("persons");

if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    persons: function() {
      return Persons.find({}, {sort: {createdAt: -1}});
    }
  });

  Template.body.events({
    "submit .new-person": function (event) {
      // Prevent default browser form submit
      event.preventDefault();
 
      // Get value from form element
      var firstname = event.target.firstname.value;
      var lastname = event.target.lastname.value;
 
      // Insert a person into the collection
      Persons.insert({
        firstname: firstname,
        lastname: lastname,
        createdAt: new Date() // current time
      });
 
      // Clear form
      event.target.firstname.value = "";
      event.target.lastname.value = "";
    }
  });

  Template.person.events({
    "click .delete": function () {
      console.log(event);
      Persons.remove(this._id);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
