import {useState} from "react";

import Post from "./Post.jsx";
import Modal from "./Modal.jsx";
import NewPost from "./NewPost.jsx";
import classes from './PostsList.module.css';

export default function PostList({isPosting, onStopPosting}) {

  const [enteredBody, setEnteredBody] = useState('');
  const [enteredAuthor, setEnteredAuthor] = useState('');

  function changeBodyHandler(event) {
    setEnteredBody(event.target.value);
  }

  function changeAuthorHandler(event) {
    setEnteredAuthor(event.target.value);
  }

  return (
    <>
      {isPosting && (
        <Modal onClose={onStopPosting}>
          <NewPost onBodyChange={changeBodyHandler} onAuthorChange={changeAuthorHandler}/>
        </Modal>
      )}
      <ul className={classes.posts}>
        <Post author={enteredAuthor} body={enteredBody}/>
        <Post author="John Doe" body="React.js is awesome!"/>
      </ul>
    </>
  );
}