import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Splash extends Component {
  render() {
    return (
      <div className="splash-container">
        <h2>This is the FullQuack Home Splash Page. Quack Quack!</h2>
        <hr />
        <Link to="/register" className = "btn btn-lg btn-light">
          <button className='submit-button'>Register</button>
        </Link>
        <Link to="/login" className = "btn btn-lg btn-light">
          <button className='submit-button'>Login</button>
        </Link>
      </div>
    )
  }
}

export default Splash;