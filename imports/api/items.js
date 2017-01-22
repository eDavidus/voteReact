import { Mongo } from 'meteor/mongo';
import Comments from './comments';
import SimpleSchema from 'simpl-schema';

const Items = new Mongo.Collection('items');

// Define schema for one item
const ItemSchema = new SimpleSchema({
    text: String,
    value: SimpleSchema.Integer,
});

// define the schema for all items
// instalation
// npm install simpl-schema
// meteor intall aldeed:collection2-core@2.0.0

const ItemsSchema = new SimpleSchema({
    itemOne: ItemSchema,
    itemTwo: ItemSchema,
    lastUpdated: {
        type: Date,
        optional: true
    }
});

// First way way (longer) to define schema
// const ItemsSchema = new SimpleSchema({
    // itemOne: {
    //     type: Object,
    // },
    // 'itemOne.text': {
    //     type: String
    // },
    // 'itemOne.value': {
    //     type: SimpleSchema.Integer
    // }, 
    //
//     lastUpdated: {
//         type: Date,
//         optional: true
//     }
// });

// second way to define schema
// const ItemsSchema = new SimpleSchema({
//     itemOne: Object,
//     'itemOne.text': String,
//     'itemOne.value': SimpleSchema.Integer,
//     itemTwo: Object,
//     'itemTwo.text': String,
//     'itemTwo.value': SimpleSchema.Integer,
//     lastUpdated: {
//         type: Date,
//         optional: true
//     }
// });

// attach the schema to the collection Items
Items.attachSchema(ItemsSchema);

if (Meteor.isServer) {
   
    // all items available to client
    Meteor.publish('allItems', function() {
        return Items.find({}, {
          limit: 20,
          sort: {lastUpdated: 1}
        });
    });
}

export default Items;
