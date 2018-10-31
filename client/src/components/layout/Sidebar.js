import React, { Component } from 'react'
import styles from './Sidebar.css';

export default class Sidebar extends Component {
  render() {

    return (
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
    )
  }
}
