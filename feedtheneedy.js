Persons = new Mongo.Collection("persons");

if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    persons: function() {
      return Persons.find({});
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
