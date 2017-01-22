import { Mongo } from 'meteor/mongo';

const Comments = new Mongo.Collection('comments');

if (Meteor.isServer) {
   
    // all comments available to client
    Meteor.publish('allComments', function() {
        return Comments.find({}, {
          limit: 100,
        //   sort: {lastUpdated: 1}
        });
    });
}


export default Comments;