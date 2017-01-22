import React, { Component } from 'react';

export default class Comment extends Component {

    _deleteComment(event) {
        event.preventDefault();
        if (confirm("Are you sure?")) {
            Meteor.call('removeComment', this.props.id);    
        }
    }
    
    render() {
        return (
                <div className="comment">
                    <p className="comment-header">{this.props.author}</p>
                    <p className="comment-body">
                        {this.props.body}
                    </p>
                    <div className="comment-footer">
                        <a href="#" className="comment-footer-delete" onClick={this._deleteComment.bind(this)}>
                            Delete comment
                        </a>
                    </div>
                </div>
            )
    }
}