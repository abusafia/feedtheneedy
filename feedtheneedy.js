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
        createdAt: new Date() // current time
      });
 
      // Clear form
      event.target.firstname.value = "";
      event.target.lastname.value = "";
    }
  });

  Template.person.events({
    "click .delete": function () {
      console.log(this._id);
      Persons.remove(this._id);
    },
    "submit .edit-person": function (event) {
      console.log(this._id+" "+this.firstname+" "+this.lastname);

      // Get value from form element
      var firstname = event.target.firstname.value;
      var lastname = event.target.lastname.value;

      Persons.update(this._id, {
        $set: {firstname: firstname, lastname: lastname}
      });
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
