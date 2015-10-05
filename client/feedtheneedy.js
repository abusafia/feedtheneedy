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
    var addressObj = {
      address: event.target.address.value,
      town: event.target.town.value,
      county: event.target.county.value,
      postcode: event.target.postcode.value
    }

    // Insert a person into the collection
    Persons.insert({
      firstname: firstname,
      lastname: lastname,
      address: addressObj,
      createdAt: new Date(), // current time
      owner: Meteor.userId(), // _id of logged in user
      createdBy: Meteor.user().username // username of logged in user
    });

    // Clear form
    event.target.firstname.value = "";
    event.target.lastname.value = "";
    event.target.address.value = "";
    event.target.town.value = "";
    event.target.county.value = "";
    event.target.postcode.value = "";
  },
  "submit .new-foodbank": function (event) {
    console.log("New Foodbank being created");
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    var name = event.target.name.value;
    var addressObj = {
      address: event.target.address.value,
      town: event.target.town.value,
      county: event.target.county.value,
      postcode: event.target.postcode.value
    }

    // Insert a person into the collection
    Foodbanks.insert({
      name: name,
      address: addressObj,
      createdAt: new Date(), // current time
      owner: Meteor.userId(), // _id of logged in user
      createdBy: Meteor.user().username // username of logged in user
    });

    // Clear form
    event.target.name.value = "";
    event.target.address.value = "";
    event.target.town.value = "";
    event.target.county.value = "";
    event.target.postcode.value = "";

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
    var addressObj = {
      address: event.target.address.value,
      town: event.target.town.value,
      county: event.target.county.value,
      postcode: event.target.postcode.value
    }

    Persons.update(this._id, {
      $set: {firstname: firstname, lastname: lastname, address: addressObj},
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
    var addressObj = {
      address: event.target.address.value,
      town: event.target.town.value,
      county: event.target.county.value,
      postcode: event.target.postcode.value
    }

    Foodbanks.update(this._id, {
      $set: {name: name, address: addressObj},
      $push: {editedBy: Meteor.user().username+" edited on: "+new Date()} // change this to a JSON object
    });
  }
});

Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});

