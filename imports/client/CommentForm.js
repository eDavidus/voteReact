import React, { Component } from 'react';

export default class CommentForm extends Component {
    
    _handelSubmit(event) {
        event.preventDefault();
        const author = this.refs.name.value.trim();
        const body = this.refs.text.value.trim();
        
        this.props.addComment(author, body);
        
        this.refs.name.value = '';
        this.refs.text.value = '';
    }
    
    render() {
        
        return (
               <form className="comment-form" onSubmit={this._handelSubmit.bind(this)}>
                <label>Join the discussion</label>
                <div className="comment-form-fields">
                    <input placeholder="Name:" ref='name' />
                    <textarea placeholder="Comment:" ref='text' ></textarea> 
                </div>
                  <div className="comment-form-action">
                    <button type="submit">Post comment</button>
                  </div>
               </form>
            )
    }
}