import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { getFeed, incrementLikes, decrementLikes } from '../../actions/postActions';
import * as postActions from '../../actions/postActions';
import PostBox from './PostBox.jsx';

class Feed extends Component {
  constructor() {
    super();
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
    console.log(e.target.id);
    this.props.incrementLikes(e.target.id);
  }

  handleClickDown = (e) => {
    console.log(e.target.id);
    this.props.decrementLikes(e.target.id);
  }

  handleSinglePost = (e) => {
    const postId = e.target.dataset.postId;
    this.props.history.push('/post/' + postId);
  }

  render() {

    let allPosts = [];
    let posts = this.props.feed;
    console.log(posts);
    for (let i = 0; i < posts.length; i++) {
      
      let date = new Date(Date.parse(posts[i].date));
      let dateObject = new Date(Date.parse(date));
      let dateReadable = dateObject.toDateString();

      let top3Comments = [];
      if (posts[i].comments.length > 0) {
        for (let j = 0; j < 3; j++) {
          if (!!posts[i].comments[j]) {
            top3Comments.push(
              <div key={j} >{posts[i].comments[j].text}</div>
            )
          }
        }
      } else {
        top3Comments = '';
      }
     
      allPosts.push(
        <div key={i} className="questionBox"> 
          <h3 id={posts[i]._id} onClick={e => this.handleClickUp(e)}>{posts[i].title}</h3>
          <h2>{posts[i].text}</h2>
          <span id={posts[i]._id} onClick={e => this.handleClickUp(e)}>⬆</span> 
          <strong> {posts[i].likes.length} </strong>
          <span id={posts[i]._id} onClick={e => this.handleClickDown(e)}>⬇</span> 
          <br></br>
          <span className='question' >{`posted by userId: ${posts[i].user} on ${dateReadable}`}<br></br><br></br>{top3Comments}<hr></hr></span>
        </div>)
    }

    return (
      <div className="feed-container">
        <h2><strong>{this.props.auth.user.name} successfully Logged in!</strong></h2>
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