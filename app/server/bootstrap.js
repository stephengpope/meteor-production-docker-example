Meteor.startup(function () {

    console.log('!')
});

Tests = new Mongo.Collection("test");

Tests.insert({
    createdBy: 5,
    createdAt: new Date(),
    title: "My first post!",
    content: "Today was a good day."
});