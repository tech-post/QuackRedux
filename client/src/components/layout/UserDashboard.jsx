import  React, { Component } from 'react';
import { connect } from 'react-redux';
import * as postActions from '../../actions/postActions';
import Box from './Box.jsx';

const mapStateToProps = state => ({ 
  auth: state.auth,
  dashboard: state.dashboard
});

// const mapDispatchToProps = dispatch => ({
//   getMyPosts: (userid) => dispatch(getMyPosts(userid))
// });

class UserDashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.getMyPosts(this.props.auth.user['id']);
  }
      
  handleClickUp = (e) => {
    this.props.incrementLikes(e.target.id);
  }
  
  handleClickDown = (e) => {
    this.props.decrementLikes(e.target.id);
  }
        
  render() {
    let myPosts = this.props.dashboard;
    return (
      <div className="userDashboard" style={{height: '700px', backgroundColor: 'yellow'}}>
      
        <h1 style={{margin: '20px', fontSize:'1.5em', fontWeight: '700'}}>Welcome, {this.props.auth.user.name}</h1>

        {myPosts.map((el) => (
          <Box className='box' 
            view='none'
            id={el._id} 
            key={el._id} 
            text={el.text} 
            title={el.title} 
            user={el.user} 
            likes={el.likes} 
            comments={el.comments} 
            date={el.date}
            handleClickUp={this.handleClickUp.bind(this)}
            handleClickDown={this.handleClickDown.bind(this)}
        />
        ))}
      </div>
    )
  }
  
}

export default connect(mapStateToProps, { ...postActions })(UserDashboard);
