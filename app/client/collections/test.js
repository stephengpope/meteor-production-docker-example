
Tests = new Mongo.Collection("test");

Tests.insert({
    createdBy: Meteor.userId(),
    createdAt: new Date(),
    title: "My first post!",
    content: "Today was a good day."
});