Meteor.publish("persons", function () {
	return Persons.find();
});

Meteor.publish("foodbanks", function () {
	return Foodbanks.find();
});