import  React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMyPosts } from '../../actions/postActions';
import Box from './Box.jsx';

const mapStateToProps = state => ({ 
  auth: state.auth,
  dashboard: state.dashboard
});

const mapDispatchToProps = dispatch => ({
  getMyPosts: (userid) => dispatch(getMyPosts(userid))
});

class UserDashboard extends Component {
  constructor(props) {
    super(props)
    this.state = []
    // this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.props.getMyPosts(this.props.auth.user['id']);
  }
      
// handleClick(e) {
  // this.props.auth.isAuthenticated
  //   this.props.getMyPosts();
  // }
        
  render() {
    let myPosts = this.props.dashboard;
    
    return (
      <div className="userDashboard" style={{height: '700px', backgroundColor: 'yellow'}}>
        <h1 style={{margin: '20px', fontSize:'1.5em', fontWeight: '700'}}>Welcome, {this.props.auth.user.name}</h1>
        {myPosts.map((el) => (
          <Box className='box' id={el._id} text={el.text} name={el.name} user={el.user} likes={el.likes} />
        ))}
      </div>
    )
  }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);
