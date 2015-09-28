Persons = new Mongo.Collection("persons");

if (Meteor.isClient) {
  // This code only runs on the client
  Meteor.subscribe("persons");
  Template.body.helpers({
    persons: function() {
      return Persons.find({}, {sort: {createdAt: -1}});
    }
  });

  Template.body.events({
    "submit .new-person": function (event) {
      console.log("New Person being created");
      // Prevent default browser form submit
      event.preventDefault();
 
      // Get value from form element
      var firstname = event.target.firstname.value;
      var lastname = event.target.lastname.value;
 
      // Insert a person into the collection
      Persons.insert({
        firstname: firstname,
        lastname: lastname,
        createdAt: new Date(), // current time
        owner: Meteor.userId(), // _id of logged in user
        createdBy: Meteor.user().username // username of logged in user
      });
 
      // Clear form
      event.target.firstname.value = "";
      event.target.lastname.value = "";
    }
  });

  Template.person.events({
    "click .delete": function () {
      Persons.remove(this._id);
    },
    "submit .edit-person": function (event) {
      // Get value from form element
      var firstname = event.target.firstname.value;
      var lastname = event.target.lastname.value;

      Persons.update(this._id, {
        $set: {firstname: firstname, lastname: lastname},
        $push: {editedBy: Meteor.user().username+" edited on: "+new Date()} // change this to a JSON object
      });
    }
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
  Meteor.publish("persons", function () {
    return Persons.find();
  });
}
