import React, { Component } from "react";
import { connect } from "react-redux";
import { getSinglePost } from "../../actions/postActions";

class Post extends Component {
  componentDidMount = () => {
    const postId = this.props.match.params.id;
    this.props.getSinglePost(postId);
  };

  render() {
    const post = this.props.feed;
    let comments = post.comments;
    // comments = comments.map(comment => {
    //   return (
    //     <div>
    //       <h1>This is a comment</h1>
    //     </div>
    //   );
    // });
    console.log(post, comments);
    return (
      <div id="post">
        <h1>{post.title}</h1>
        <span>Created By: {post.user}</span>
        <br />
        <span>Created On: {post.date}</span>
        <div>
          <p>{post.text}</p>
        </div>
        {/* <div>{comments}</div> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  feed: state.feed
});

export default connect(
  mapStateToProps,
  { getSinglePost }
)(Post);
