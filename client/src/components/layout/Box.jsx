import React from 'react';
import { connect } from 'react-redux';
import * as postActions from '../../actions/postActions';

const Box = (props) => {

  let date = new Date(Date.parse(props.date));
  let dateObject = new Date(Date.parse(date));
  const dateReadable = dateObject.toDateString();

  let top3Comments = [];
  if (props.comments.length > 0) {
    for (let j = 0; j < 3; j++) {
      if (!!props.comments[j]) {
        top3Comments.push(
          <div key={j} >{props.comments[j].text}</div>
        )
      }
    }
  } else {
    top3Comments = '';
  }

  return (
    <div className="box">
      <div style={{ display: 'none' }}>user:{props.user}</div>
      <h2 className="title" data-post-id={props.id} onClick={e => props.handleSinglePost(e)}>{props.title}</h2>
      <h3>{props.text}</h3>
      <div>{`posted by userId: ${props.user} on ${dateReadable}`}</div>
      <div>{top3Comments}</div>
      <div style={{ display: props.view }}>
        <span className="arrows" data-post-id={props.id} onClick={e => props.handleClickUp(e)}>⬆</span>
        <strong> {props.likes.length} </strong>
        <span className="arrows" data-post-id={props.id} onClick={e => props.handleClickDown(e)}>⬇</span>
      </div>
      <div style={{ display: props.deleteButton }}><button data-post-id={props.id} onClick={e => props.handleDeletePost(e)}>Delete</button></div>
    </div>
  )
}

export default connect(null, { ...postActions })(Box);