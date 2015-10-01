Meteor.subscribe("persons");
Template.body.helpers({
  persons: function() {
    return Persons.find({}, {sort: {createdAt: -1}});
  }
});

Meteor.subscribe("foodbanks");
Template.body.helpers({
  foodbanks: function() {
    return Foodbanks.find({}, {sort: {createdAt: -1}});
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
  },
  "submit .new-foodbank": function (event) {
    console.log("New Foodbank being created");
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    var name = event.target.name.value;
    var address = event.target.address.value;
    var town = event.target.town.value;
    var county = event.target.county.value;
    var postcode = event.target.postcode.value;


    // Insert a person into the collection
    Foodbanks.insert({
      name: name,
      address: address,
      town: town,
      county: county,
      postcode: postcode,
      createdAt: new Date(), // current time
      owner: Meteor.userId(), // _id of logged in user
      createdBy: Meteor.user().username // username of logged in user
    });

    // Clear form
    event.target.name.value = "";
    event.target.location.value = "";
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

Template.foodbank.events({
  "click .delete": function () {
    Foodbanks.remove(this._id);
  },
  "submit .edit-foodbank": function (event) {
    // Get value from form element
    var name = event.target.name.value;
    var location = event.target.location.value;

    Foodbanks.update(this._id, {
      $set: {name: name, location: location},
      $push: {editedBy: Meteor.user().username+" edited on: "+new Date()} // change this to a JSON object
    });
  }
});

Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});

