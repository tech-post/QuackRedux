import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { getFeed, incrementLikes, decrementLikes } from '../../actions/postActions';
import * as postActions from '../../actions/postActions';
import PostBox from './PostBox.jsx';
import Box from './Box.jsx';

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    if (this.props.auth.isAuthenticated === false) {
      this.props.history.push('/login');
    }
  }

  componentDidMount() {
    this.props.getFeed();
    let posts = this.props.feed;
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].likes.length !== undefined) {
        this.setState({ likesCount: posts[i].likes.length })
      }
    }
  }
  
  handleClickUp = (e) => {
    const postId = e.target.dataset.postId;
    this.props.incrementLikes(postId);
  }
  
  handleClickDown = (e) => {
    const postId = e.target.dataset.postId;
    this.props.decrementLikes(postId);
  }

  handleSinglePost = (e) => {
    const postId = e.target.dataset.postId;
    this.props.history.push('/post/' + postId);
  }
  
  render() {
    let allPosts = [];
    let posts = this.props.feed;
    if (Array.isArray(posts)) {
      allPosts = posts.map((el) => (
        <Box className='box' 
          view='block'
          deleteButton='none'
          id={el._id} 
          key={el._id} 
          text={el.text} 
          title={el.title} 
          user={el.user} 
          likes={el.likes} 
          comments={el.comments} 
          date={el.date}
          handleSinglePost={this.handleSinglePost.bind(this)}
          handleClickUp={this.handleClickUp.bind(this)}
          handleClickDown={this.handleClickDown.bind(this)}
        />
    ))
    }

    return (
      <div className="feed-container">
        <h2><strong>Hello {this.props.auth.user.name} !</strong></h2>
        <br></br>
        <PostBox />
        <hr></hr>
        {allPosts}
      </div>
    )
  }
};

const mapStateToProps = state => ({
  auth: state.auth,
  feed: state.feed,
});

export default connect(mapStateToProps, { ...postActions })(Feed);
// export default connect(mapStateToProps, { getFeed, incrementLikes, decrementLikes })(Feed);