import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import uuidv1 from 'uuid/v1'
import serializeForm from 'form-serialize'
import Timestamp from 'react-timestamp'
import { loadPost, deletePost, votePost, loadComments, addComment, deleteComment, voteComment} from '../actions'

class ShowPost extends Component {

  state = {
    author: '',
    body: ''
  };

  componentDidMount() {
    this.props.loadComments(this.props.match.params.post_id);
    this.props.loadPost(this.props.match.params.post_id);
  };

  deletePost = postId => {
    this.props.deletePost(postId);
    this.props.history.push('/');
  };

  votePost = (id, value) => {
    this.props.votePost(id, value);
  };

  deleteComment = commentId => {
    this.props.deleteComment(commentId);
  };

  voteComment = (id, value) => {
    this.props.voteComment(id, value);
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleSaveComment = (event) => {
    event.preventDefault();
    const values = serializeForm(event.target, { hash: true })
    this.props.addComment(values);
    this.setState({
      author: '',
      body: ''
    });
  };

  render() {

    console.log(this.props, 'this.props in show_post')

    const { posts } = this.props.posts;
    const { comments } = this.props.comments;

    // console.log(posts, 'posts in show_post')

    return (
      <div className='posts-wrapper'>
        <div>Show Post</div>
        <button onClick={ () => this.votePost( posts.id, 'upVote' ) }>Up</button>
        <div><Link to={'/'} key='back'>Back</Link></div>
        {
          posts && posts.length && Object.keys(posts[0]).length && !posts[0].error ? (<div>
            {
              posts.filter( post => !post.deleted).map(post => (
                <div key={post.id}>
              <input type='text' name='pCategory' value={post.category} readOnly/>
              <input type='text' name='pTitle' value={post.title} readOnly/>
              <input type='text' name='pAuthor' value={post.author} readOnly/>
              <Timestamp time={ post.timestamp / 1000 } format='full' />
              <div>
                <button onClick={ () => this.votePost( post.id, 'upVote' ) }>Up</button>
                Score { post.voteScore }
                <button onClick={ () => this.votePost( post.id, 'downVote' ) }>Down</button>
              </div>
              <div> Comment count {post.commentCount} </div>
              <button onClick={ () => this.deletePost(post.id) }>Delete Post</button>
              <Link to={`/editpost/${post.id}`}><button>Edit Post</button></Link><br/>
              <textarea name='pContent' value={post.body} readOnly/>
              <div className='comments-wrapper'>
                {
                  comments && comments.length && comments.filter ( comment => !comment.deleted ).map( comment => (
                    <div key={uuidv1()} className='comment'>
                      <div>{comment.author}</div>
                      <div>{comment.body}</div>
                      <Timestamp time={ comment.timestamp / 1000 } format='full' />
                      <div>
                        <button onClick={ () => this.voteComment(comment.id, 'upVote') }>Up</button>
                        Score {comment.voteScore}
                        <button onClick={ () => this.voteComment(comment.id, 'downVote') }>Down</button>
                      </div>
                      <Link to={`/editcomment/${comment.id}`}><button>Edit Comment</button></Link>
                      <button onClick={ () => this.deleteComment(comment.id) }>Delete Comment</button>
                    </div>
                  ))
                }
                <div className='add-comment-wrapper'>
                  <form onSubmit={ this.handleSaveComment }>
                    <input type='hidden'  name='id' value={uuidv1()}/>
                    <input type='hidden'  name='parentId' value={post.id}/>
                    <input type='hidden'  name='timestamp' value={Date.now()}/>
                    <input type='hidden'  name='deleted' value='false'/>
                    <input type='hidden'  name='parentDeleted' value='false'/>
                    <input type='hidden'  name='voteScore' value='1'/>

                    <input type='text' name='author' value={this.state.author} onChange={this.handleInputChange}/>
                    <textarea name='body' value={this.state.body}  onChange={this.handleInputChange}/>
                    <button>Add Comment</button>
                  </form>
                </div>
              </div>
            </div>
              ))
            }
            </div>) : (<div>Post not found! 404 <Link to={'/'} key='back'>Back</Link></div>)
        }
      </div>
    );
  }

}

const mapStateToProps = ({ posts, comments }) => ({
  posts,
  comments
});

const mapDispatchToProps = dispatch => ({
  loadComments: postId => dispatch(loadComments(postId)),
  loadPost: postId => dispatch(loadPost(postId)),
  deletePost: postId => dispatch(deletePost(postId)),
  votePost: (postId, option) => dispatch(votePost(postId, option)),
  addComment: comment => dispatch(addComment(comment)),
  deleteComment: commentId => dispatch(deleteComment(commentId)),
  voteComment: (commentId, option) => dispatch(voteComment(commentId, option))
});

export default connect(mapStateToProps, mapDispatchToProps)(ShowPost);
