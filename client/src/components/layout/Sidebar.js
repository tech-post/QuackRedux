import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './Sidebar.css';

class Sidebar extends Component {
  render() {

    return (
      <div>{this.props.auth.isAuthenticated !== false ?
        <div className="sidenav" style={styles} >
          <a href="#all">all</a>
          <a href="#CSS">CSS</a>
          <a href="#Functional Programming">Functional Programming</a>
          <a href="#HTML">HTML</a>
          <a href="#Javascript">Javascript</a>
          <a href="#Node.js">Node.js</a>
          <a href="#Object Oriented Programming">Object Oriented Programming</a>
          <a href="#React">React</a>
          <a href="#Redux">Redux</a>
        </div>
       : ''}</div>  
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default (connect(mapStateToProps, null)(Sidebar));