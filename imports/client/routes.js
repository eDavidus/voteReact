import React from 'react';

import { 
    Router,
    Route,
    IndexRoute,
    browserHistory
} from 'react-router';
import { render } from 'react-dom';

import App from './App';
import MainLayout from './layouts/MainLayout';
import CommentBox from './CommentBox';

Meteor.startup(() => {
  render(
      <Router history={browserHistory}>
        <Route path="/" component={MainLayout}>
          <IndexRoute component={App} />
          <Route path="/comments" component={CommentBox} />
        </Route>
      </Router>,
      document.getElementById('render-target')
      );
});

{/*
// Meteor.startup(() => {
//   render(
//       <Router history={browserHistory}>
//         <Route path="/" component={App} />
//         <Route path="/comments" component={CommentBox} />
//       </Router>,
//       document.getElementById('render-target')
//       );
// });
*/}