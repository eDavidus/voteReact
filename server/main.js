import { Meteor } from 'meteor/meteor';

import Items from '../imports/api/items';
import '../imports/server/accounts';

// publish current user, subscription in App
Meteor.publish('currentUser', function() {
    return Meteor.users.find({_id: this.userId}, {
        fields: {
            roles: 1
        }
    });
});

Meteor.startup(() => {
  // code to run on server at startup


});
