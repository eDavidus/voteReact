import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
// import { autobind } from 'core-decorators';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import Item from './Item';
import IsRole from './utilities/isRole';
import Items from '../api/items';
import CommentBox from './CommentBox.js'

// create a component
// @autobind
class App extends Component {

  addItems(event) {
    event.preventDefault();
    const itemOne = this.refs.itemOne.value.trim();
    const itemTwo = this.refs.itemTwo.value.trim();
    // console.log(Meteor.users.findOne({_id: Meteor.userId()}).emails[0].address);

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
    // true if user.roles has 'admin' value
    // const showAll = Roles.userIsInRole(Meteor.userId(), 'admin') ? (
        // <button onClick={this.showAll.bind(this)}>
        //   Show {this.props.showAll ? 'One' : 'All'}
        // </button>
      // ): null;

    return (
      <main>
        {/*{ showAll }*/}
        {/*<IsRole role={['admin', 'voter']}>*/}
        <IsRole role='admin'>
        {/* if the user has the role admin, show the button (children) */}
          <button onClick={this.showAll.bind(this)}>
            Show {this.props.showAll ? 'One' : 'All'}
          </button>
        </IsRole>
        <form className='new-items' onSubmit={this.addItems.bind(this)}>
          <input type='text' ref='itemOne'/>
          <input type='text' ref='itemTwo' />
          <button type='submit'>Add Items</button>
        </form>
        <ReactCSSTransitionGroup
          transitionName="item"
          transitionEnterTimeout={400}
          transitionLeaveTimeout={400}
          transitionAppear={true}
          transitionAppearTimeout={400}>
          {this.props.items.map((item) => {
            return <Item item={item} key={item._id} />
          })}
        </ReactCSSTransitionGroup>
      </main>
      );
  }
}


export default createContainer(({params}) => {
  // calls the 'allItems' subscribe method
  let itemSub = Meteor.subscribe('allItems');
  let userSub = Meteor.subscribe('currentUser');
  let showAll = Session.get('showAll');
  // Meteor.subscribe('allUsers');

  // show one itm if there is an id on the path
  let itemsArray;
  if(params.id) {
    itemsArray = Items.find({_id: params.id}).fetch();
  } else {
    itemsArray = Items.find({}, {
      limit: showAll ? 50 : 1,
      sort: {lastUpdated: 1}
    }).fetch()
  }
  return {
    showAll,
    ready: itemSub.ready() && userSub.ready(),
    // fetch method allows to get an array, not just a cursor
    items: itemsArray
  }
}, App);
