import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import MainPage from './components/main_page'
import AddPost from './components/add_post'
import ShowPost from './components/show_post'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={MainPage} />
        <Route exact path='/addpost' component={AddPost} />
        {/* <Route exact path='/:category/' component={ShowCategoryPosts} /> */}
        {/* <Route exact path='/editpost/:postId' component={EditPost} /> */}
        {/* <Route exact path='/editcomment/:commentId' component={EditComment} /> */}
        <Route exact path='/:category/:post_id' component={ShowPost} />
      </Switch>
    );
  }
}

export default App;
