import  React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMyPosts } from '../../actions/postActions';

const mapStateToProps = state => ({ 
  auth: state.auth
});

const mapDispatchToProps = dispatch => {
  return {
    getMyPosts: () => {
      dispatch(getMyPosts())
    }
  }
};

class UserDashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {}

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    // this.props.auth.isAuthenticated
    this.props.getMyPosts();

  }

  render() {
    
    return (
      <div className="userDashboard">
          <button onClick={() => this.handleSubmit()}>My Posts</button>
      </div>
    )
  }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);
