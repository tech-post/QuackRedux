import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { removeCurrentUser } from '../../actions/authActions';
import styles from './Navbar.css';
import UserDashboard from './UserDashboard.jsx';

class Navbar extends Component {
  constructor() {
    super();
    this.state = {}
  }

  HandleLinkClick = (e) => {
    const link = e.target.dataset.link;
    this.props.history.push('/' + link);
  }

  HandleLogOut = (e) => {
    this.props.removeCurrentUser();
    this.props.history.push('/');
  }
  HandleClickMyPosts = (e) => {
    this.props.history.push('/userdashboard');
  }


  render() {

    return (
        <div>{this.props.auth.isAuthenticated !== false ?
          <nav id="nav-bar" style={styles}>
            <div id="logo" onClick={(e) => { this.HandleLinkClick(e); }}>
              <p data-link="feed">LOGO</p>
            </div>

            <input id="search-bar" type="search" placeholder="Search Posts" />

            <div id="nav-links">
              <button>Create Post</button>
              <button onClick={(e) => { this.HandleClickMyPosts(e); }}>My Posts</button>
              <button onClick={(e) => { this.HandleLogOut(e); }}>Log Out</button>
            </div>
          </nav> : ''
        }</div> 
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default withRouter(connect(mapStateToProps, { removeCurrentUser })(Navbar));