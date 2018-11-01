import  React, { Component } from 'react';
import { connect } from 'react-redux';
import { createPost } from '../../actions/postActions';
import axios from 'axios';

const mapStateToProps = state => ({ 
  auth: state.auth
});

const mapDispatchToProps = dispatch => {
  return {
    addPost: (postData) => {
      dispatch(createPost(postData))
    }
  }
};

class PostBox extends Component {
  constructor(props) {
    super(props)

    this.state = {
      postTitle: '',
      postBody: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
      const newPostObj = {
      title: this.state.postTitle,
      text: this.state.postBody
    } 

    let config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': localStorage['jwtToken']
      }
    };
    
    axios
    .post('/api/posts', newPostObj, config)
    .then(res => {
      this.props.addPost(res.data);
      
      this.setState({ //not sure why this isn't clearing out state
        postTitle: '',
        postBody: ''
      });
    })
    .catch((err) => console.log(err))

  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    
    return (
      <div className='wrapper'>
        <div className="postBox">
        
          <div><h3>Hello {this.props.auth.user.name}! Create a post.</h3></div>
          <div className='postBoxTop'>
            <div className='postBoxLeft'>
              <div>Title:</div>
              <div>Content:</div>
            </div>
            <div className='postBoxRight'>
              <textarea value={this.state.postTitle} name='postTitle' onChange={(e) => {this.handleChange(e)}} />
              <textarea value={this.state.postBody} name='postBody' onChange={(e) => {this.handleChange(e)}} />
            </div>  
          </div>

          <div className='postBoxBottom'>
            <button class='submit-button' onClick={() => this.handleSubmit()}>Post</button>
          </div>

        </div>
      </div>
    )
  }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(PostBox);
