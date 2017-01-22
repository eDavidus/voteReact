import React, { Component } from 'react';
import Items from '../api/items';

export default class Item extends Component {
    voteOne() {
        // allow to update vote only if user login
        if(Meteor.userId()) {
            Meteor.call('voteItemOne', this.props.item._id);          
        }
        else {
            alert("You must login to vote!");
        }
    }
    voteTwo() {
        if(Meteor.userId()) {
            Meteor.call('voteItemTwo', this.props.item._id);           
        }
        else {
            alert("You must login to vote!");
        }
    }
    render() {
        return (
            <div className='item'>
                <div className='vote-one' onClick={this.voteOne.bind(this)}> 
                    <span>{this.props.item.itemOne.value}</span>
                    <h3>{this.props.item.itemOne.text}</h3>
                </div>
                <span>vs</span>
                <div className='vote-two' onClick={this.voteTwo.bind(this)}> 
                    <span>{this.props.item.itemTwo.value}</span>
                    <h3>{this.props.item.itemTwo.text}</h3>
                </div>                 
            </div>
            )
    }
}