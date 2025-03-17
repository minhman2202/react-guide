import {useState} from "react";

import Post from "./Post.jsx";
import NewPost from "./NewPost.jsx";
import classes from './PostsList.module.css';

export default function PostList({posts}) {
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
      <NewPost onBodyChange={changeBodyHandler} onAuthorChange={changeAuthorHandler}/>
      <ul className={classes.posts}>
        <Post author="John Doe" body="React.js is awesome!"/>
        <Post author={enteredAuthor} body={enteredBody}/>
      </ul>
    </>
  );
}