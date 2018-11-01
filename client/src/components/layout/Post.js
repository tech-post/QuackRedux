import React, { Component } from "react";
import { connect } from "react-redux";
import { getSinglePost, addNewComment } from "../../actions/postActions";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ''
    };
  }

  componentDidMount = () => {
    const postId = this.props.match.params.id;
    this.props.getSinglePost(postId);
  };

  handleCommentText = (e) => {
    this.setState({comment: e.target.value});
  }

  handleSubmitComment = () =>{
    const postId = this.props.match.params.id; 
    this.props.addNewComment(postId, {text: this.state.comment});
    this.setState({comment: ''});
  }

  render() {
    const post = this.props.feed;
    let user = {};
    let comments = post.comments;
    let date = new Date(Date.parse(post.date));
    let dateObject = new Date(Date.parse(date));
    const dateReadable = dateObject.toDateString();

    if(comments !== undefined){
      comments = comments.map(comment => {
        return (
          <div key = {comment._id}>
            <p>{comment.text}</p>
          </div>
        )
      });
    }

    for(let key in post.user){
      user[key] = post.user[key];
    }

    return (
      <div id="post">
        <h1>{post.title}</h1>
        <span>Created By: {user.name}</span>
        <br />
        <span>Created On: {dateReadable}</span>
        <div>
          <p>{post.text}</p>
        </div>
        <div>
          {comments}
        </div>

        <div>
          <input type="text" placeholder="Enter a comment" onChange={(e) => this.handleCommentText(e)} value={this.state.comment}/>
          <button onClick={() => {this.handleSubmitComment()}}>Submit</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  feed: state.feed
});

export default connect(
  mapStateToProps,
  { getSinglePost, addNewComment }
)(Post);
