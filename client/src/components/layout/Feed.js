import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFeed, incrementLikes, decrementLikes } from '../../actions/postActions';

class Feed extends Component {
  constructor() {
    super();
    this.state = {};
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
    console.log(localStorage['jwtToken']);
    this.props.incrementLikes(e.target.id);

    // let newCount = this.state.likesCount + 1
    // this.setState({
    //   likesCount: newCount
    // })
  }

  handleClickDown = (e) => {
    console.log(e.target.id);
    console.log(localStorage['jwtToken']);
    this.props.decrementLikes(e.target.id);

    // let newCount = this.state.likesCount - 1
    // this.setState({
    //   likesCount: newCount
    // })
  }

  render() {

    let allPosts = [];
    let posts = this.props.feed;
    console.log(posts);
    for (let i = 0; i < posts.length; i++) {
      // let likesCount = 0;
      // if (posts[i].likes.length !== undefined) {
      //   this.setState({ likesCount: posts[i].likes.length})

      //   this.state.likesCount = posts[i].likes.length;
      // }
      let date = new Date(Date.parse(posts[i].date));
      let dateObject = new Date(Date.parse(date));
      let dateReadable = dateObject.toDateString();
      // We haven't placed dateReadable in the div yet (still working on layout UX), but it's ready to insert.
      allPosts.push(
        <div key={i} className="questionBox"> 
          <span id={posts[i]._id} onClick={e => this.handleClickUp(e)}>⬆</span> 
          <strong> {posts[i].likes.length} </strong>
          <span id={posts[i]._id} onClick={e => this.handleClickDown(e)}>⬇</span> 
          <span >{posts[i].name}<br></br>{posts[i].tags}<br></br>{posts[i].text}</span><br></br>
          <span className='question' >{dateReadable}<br></br>{posts[i].user}<br></br>{posts[i].comments}<hr></hr></span>
        </div>)
    }

    return (
      <div className="feed-container">
        <h3>{this.props.auth.user.name} successfully Logged in!</h3>
        {allPosts}
      </div>
    )
  }
};

const mapStateToProps = state => ({ 
  auth: state.auth,
  feed: state.feed,
});

const mapDispatchToProps = dispatch => ({
  getFeed: () => dispatch(getFeed()),
  incrementLikes: (id) => dispatch(incrementLikes(id)),
  decrementLikes: (id) => dispatch(decrementLikes(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feed);