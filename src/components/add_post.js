import React, { Component } from 'react'
import { connect } from 'react-redux'
import uuidv1 from 'uuid/v1'
import serializeForm from 'form-serialize'
import { Link } from 'react-router-dom'
import { addPost, loadCategories} from '../actions'

class AddPost extends Component {
  state = {
    category: 'react'
  }

  componentDidMount() {
    this.props.loadCategories();
  }

  setCategory = (event) => {
    this.setState({ category: event.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const data = serializeForm(e.target, { hash: true })
    this.props.addPost(data);
    this.props.history.push('/');
  }

  render() {
    const categories = this.props.categories

    console.log(this.props)

    return (
      <div className='wrapper'>
        <div>Add Post</div>
        <div><Link to={'/'} key='back'>Back</Link></div>
        <form onSubmit={ this.handleSubmit }>
          <input type='hidden'  name='id' value={uuidv1()}/>
          <input type='hidden'  name='timestamp' value={Date.now()}/>
          <input type='hidden'  name='deleted' value='false'/>
          <input type='hidden'  name='voteScore' value='1'/>
          <label>
            Select a category:
            <select name='category' value={this.state.category} onChange={this.setCategory}>
            { categories && categories.length > 0 && categories.map( category => (
                <option key={ category.name } value={ category.name }>{ category.name }</option>
            ))}
            </select>
          </label>
          <input type='text' name='title' placeholder='Title'/>
          <input type='text' name='author' placeholder='Author'/>
          <textarea name='body' value={this.state.body}/>
          <button>Save Post</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ categories }) => ({
  categories
});

export default connect(mapStateToProps, { addPost, loadCategories })(AddPost);
