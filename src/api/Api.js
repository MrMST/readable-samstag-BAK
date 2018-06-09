const API = 'http://localhost:3001';

class Api {
  static getPosts() {
    return fetch(`${API}/posts` , { headers: { 'Authorization': 'whatever-you-want' } }).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static getPost(id) {
    return fetch(`${API}/posts/${id}`, { headers: { 'Authorization': 'whatever-you-want' } }).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static votePost = (postId, option) => {
    return fetch(`${API}/posts/${postId}`, { method: 'POST', headers: {
      'Authorization': 'whatever-you-want',
      'Content-Type': 'application/json'
    }, body: JSON.stringify({option})})
    .then(data => data.json());
  };

  static addPost = (post) => {
    return fetch(`${API}/posts`, { method: 'POST', headers: {
      'Authorization': 'whatever-you-want',
      'Content-Type': 'application/json'
    }, body: JSON.stringify(post)})
    .then(data => data.json());
  };

  static deletePost = (postId) => {
    return fetch(`${API}/posts/${postId}`, { method: 'DELETE', headers : {
      'Authorization': 'whatever-you-want',
      'Content-Type': 'application/json'
    } }).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static getCategories = () => {
    return fetch(`${API}/categories`, { headers: { Authorization: 'whatever-you-want' }}).then(response => {
      return response.json().then(data => data.categories);
    });
  }

  static getComments(postId) {
    return fetch(`${API}/posts/${postId}/comments`, { headers: { Authorization: 'whatever-you-want' } }).then(response => {
      return response.json().then(data => data);
    }).catch(error => {
      return error;
    });
  }

  static addComment = (comment) => {
    const body = JSON.stringify(comment);
    return fetch(`${API}/comments/`, { method: 'POST', headers: {
        Authorization: 'whatever-you-want',
        'Content-Type': 'application/json'
      },
      body
    }).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static deleteComment = (commentId) => {
    return fetch(`${API}/comments/${commentId}`, { method: 'DELETE', headers : {
      'Authorization': 'whatever-you-want',
      'Content-Type': 'application/json'
    } }).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  static voteComment = (commentId, option) => {
    return fetch(`${API}/comments/${commentId}`, { method: 'POST', headers: {
        Authorization: 'whatever-you-want',
        'Content-Type': 'application/json'
      }, body: JSON.stringify({ option: option })
    }).then(data => data.json());
  };
}

export default Api;