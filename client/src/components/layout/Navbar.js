import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import styles from './Navbar.css';

class Navbar extends Component {
  constructor() {
    super();
  }

  HandleLinkClick = (e) => {
    console.log(e.target.dataset.link);
    const link = e.target.dataset.link;
    this.props.history.push('/' + link);
  }

  HandleLogOut = (e) => {
    this.props.history.push('/');
  }

  render() {

    return (
      <nav id="nav-bar" style={styles}>
        <div id="logo" onClick={(e) => { this.HandleLinkClick(e); }}>
          <p data-link="feed">LOGO</p>
        </div>

        <input id="search-bar" type="search" placeholder="Search Posts" />

        <div id="nav-links">
          <button>Create Post</button>
          <button>My Posts</button>
          <button onClick={(e) => { this.HandleLogOut(e); }}>Log Out</button>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default withRouter(connect(mapStateToProps)(Navbar));