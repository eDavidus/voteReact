import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Comments from '../api/comments';
import Comment from './Comment.js';
import CommentForm from './CommentForm.js';

class CommentBox extends Component {

    constructor() {
        super();
        
        this.state = {
          showComments: false,
        //   comments: [
                        // {id: 1, author: 'Morgan McCircuit', body: 'Great Stuff'},
                        // {id: 2, author: 'Dave', body: 'Excellent picture'},
                        // {id: 3, author: 'Dave', body: 'Excellent picture'}              
            //   ]
        };
    }
    
    // _fetchComments() {
    //     this.setState({ comments: this.props.comments });
    // }
    
    // componentWillMount() {
    //     this._fetchComments();
    // }
    
    // componentDidMount() {
    //     this.timer = setInterval(() => this._fetchComments(), 5000);
    // }
    
    // componentWillUnmount() {
    //     clearInterval(this._timer);
    // }
    
    _getComments() {
        return this.props.comments.map( (comment) => {
            return (
                <Comment author={comment.author} body={comment.body} id={comment._id} key={comment._id} />
                );
        });
    }
    
    _getCommentsTitle(commentCount) {
        if (commentCount === 0) {
            return 'No comment';
        } else if (commentCount === 1) {
            return '1 comment';
        } else {
            return `${commentCount} comments`;
        }
    }
    
    _handleClick() {
        this.setState({
            showComments: !this.state.showComments
        });
    }
    
    _addComment(author, body) {
        const comment = {
            author,
            body
        }
        
      if (Meteor.userId()) {
        Meteor.call('insertNewComment', comment);
      }
    }
    
    render() {
        
        if (!this.props.ready) {
          return <h2>Loading comments!</h2>
        }
            
        const comments = this._getComments();
        let commentNodes;
        let buttonText = "Show comments";
        if (this.state.showComments) {
            buttonText = "Hide comments";
            commentNodes = <div className="comment-list">{comments}</div>;
        }
        return (
                <div className="comment-box">
                    <CommentForm addComment={this._addComment.bind(this)}/>
                    <h3>Comments</h3>
                    <h4 className="comment-count">
                        {this._getCommentsTitle(comments.length)}
                    </h4>
                    <button onClick={this._handleClick.bind(this)}>{buttonText}</button>
                    {commentNodes}
                </div>
            )
    }
}


export default createContainer(() => {
  // calls the 'allItems' subscribe method
  let commentSub = Meteor.subscribe('allComments');

  return {
    ready: commentSub.ready(),
    // fetch method allows to get an array, not just a cursor
    comments: Comments.find({}, {
      limit: 100,
    }).fetch()
  }
}, CommentBox);