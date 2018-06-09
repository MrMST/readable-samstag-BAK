import React, { Component } from 'react'
import { connect } from 'react-redux'
import Timestamp from 'react-timestamp'
import { Link } from 'react-router-dom'
import { loadPosts, loadCategories, deletePost, changeSorting, votePost } from '../actions'

class MainPage extends Component {

componentDidMount() {
  this.props.loadPosts();
  this.props.loadCategories();
}

changeSorting = (sorting) => {
  this.props.changeSorting({ sorting });
}

votePost = (id, value) => {
  this.props.votePost(id, value);
}

deletePost = (id) => {
  this.props.deletePost(id);
};

render() {
  const {posts} = this.props.posts
  const {sorting} = this.props.sorting
  const categories = this.props.categories

  return(
      <div className='post-list-wrapper'>
          <ul>
          <li><Link to={'/'} key='all'><button>All</button></Link></li>
          {
          categories && categories && categories.length > 0 && categories.map( category =>(
            <li key={category.name}><Link to={`/${category.path}`}><button>{ category.name }</button></Link></li>
           ))
          }
        </ul>
        <button onClick={ () => this.changeSorting('votescore') }>VoteScore</button>
        <button onClick={ () => this.changeSorting('timestamp') }>Timestamp</button>
        <Link to='/addpost'><button>Add Post</button></Link>
        <ul>
          { posts && posts.length > 0 &&
            posts.filter(post => !post.deleted)
            .sort(( a, b ) => {
              switch ( sorting ) {
                case 'timestamp':
                  return b.timestamp - a.timestamp;
                default:
                  return b.voteScore - a.voteScore;
              }
            })
            .map( post => (
            <li key = { post.id }>
              <div className='post-wrapper'>
                <div>Category: { post.category }</div>
                <div>Title: <Link to={`/${post.category}/${post.id}`}>{ post.title }</Link></div>
                <div><Timestamp time={ post.timestamp / 1000 } format='full' /></div>
                <div>Author: { post.author }</div>
                <div>Comments: { post.commentCount }</div>
                <div>
                  <button onClick={ () => this.votePost( post.id, 'upVote' ) }>Up</button>
                  CurrentScore: { post.voteScore }
                  <button onClick={ () => this.votePost( post.id, 'downVote' ) }>Down</button>
                </div>
                <div><button onClick={ () => this.deletePost( post.id ) }>Remove Post</button></div>
                <div><Link to={`/editpost/${post.id}`}><button>Edit Post</button></Link></div>
              </div>
            </li>
          ))}
        </ul>
      </div>
  );
}

}

const mapStateToProps = ({posts, categories, sorting}) => ({
  posts, categories, sorting
})

export default connect(mapStateToProps, {loadPosts, loadCategories, deletePost, changeSorting, votePost})(MainPage)