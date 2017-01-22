import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import Item from './Item';
import Items from '../api/items';
import CommentBox from './CommentBox.js'

// create a component
class App extends Component {
  
  addItems(event) {
    event.preventDefault();
    const itemOne = this.refs.itemOne.value.trim();
    const itemTwo = this.refs.itemTwo.value.trim();

    if (itemOne == '') {
      this.refs.itemTwo.value = '';
    }
    else if (itemTwo == '') {
      this.refs.itemOne.value = '';
    }
    else if (itemOne != ''  && itemTwo != '') {
      if (Meteor.userId()) {
        Meteor.call('insertNewItem', itemOne, itemTwo, (err, res) => {
          if (!err) {
          // remove the items on form only if there is no error
            this.refs.itemOne.value = '';
            this.refs.itemTwo.value = '';            
          }
        });     
      }
      else {
        alert("You must log in to add items!");
      }
    }
  }
  
  showAll() {
    Session.set('showAll', !this.props.showAll);
  }
  
  render() {
    
    if (!this.props.ready) {
      return <h2>Loading!</h2>
    }
    return (
      <main>
        <button onClick={this.showAll.bind(this)}>
          Show {this.props.showAll ? 'One' : 'All'}
        </button>
        <form className='new-items' onSubmit={this.addItems.bind(this)}>
          <input type='text' ref='itemOne'/>
          <input type='text' ref='itemTwo' />
          <button type='submit'>Add Items</button>
        </form>
        {this.props.items.map((item) => {
          return <Item item={item} key={item._id} />
        })}
      </main>
      );
  }
}


export default createContainer(() => {
  // calls the 'allItems' subscribe method
  let itemSub = Meteor.subscribe('allItems');
  let showAll = Session.get('showAll');
  // Meteor.subscribe('allUsers');
  return {
    showAll,
    ready: itemSub.ready(),
    // fetch method allows to get an array, not just a cursor
    items: Items.find({}, {
      limit: showAll ? 20 : 1,
      sort: {lastUpdated: 1}
    }).fetch()
  }
}, App);



