
import React from 'react';
import { connect } from 'react-redux';
// import * as actions from '../../actions/postActions';

const mapStateToProps = store => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
};

const Box = (props) => (
  <div className="box">
    <div style={{display: 'none'}}>id:{props.id}</div>
    <div>text:{props.text}</div>
    <div>title:{props.name}</div>
    <div>user:{props.user}</div>
    <div>likes:{props.likes}</div>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(Box);
