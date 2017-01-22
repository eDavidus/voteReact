import Items from '../imports/api/items';
import Comments from '../imports/api/comments';

if (Meteor.isServer) {
   
    Meteor.methods({
        insertNewItem(itemOne, itemTwo) {
            // ensure a user is logged in
            if (this.userId) {
                // check(itemOne, String);
                // check(itemTwo, String);
                Items.insert({
                  itemOne: {
                    text: itemOne,
                    value: 0,
                  },
                  itemTwo: {
                    text: itemTwo,
                    value: 0,
                  }
                });           
            }
        },
        voteItemOne(id) {
            if (this.userId) {
                let date = new Date();
                Items.update(id, {
                    $inc: {
                        'itemOne.value': 1
                    },
                    $set: {
                        lastUpdated: date
                    }
                });             
            }
        },
        voteItemTwo(id) {
            if (this.userId) {
                let lastUpdated = new Date();
                Items.update(id, {
                    $inc: {
                        'itemTwo.value': 1
                    },
                    $set: {
                        lastUpdated
                    }
                });             
            }
        },
        insertNewComment(comment) {
            // ensure a user is logged in
            if (this.userId) {
                check(comment, Object);
                Comments.insert({ author: comment.author, body: comment.body });
            }
        },
        removeComment(id) {
            // ensure a user is logged in
            if (this.userId) {
                check(id, String);
                Comments.remove(id);
            }
        },
    });    
}

