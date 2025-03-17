import {useState} from "react";

import Modal from "../components/Modal.jsx";
import classes from '../components/NewPost.module.css';
import {Link} from "react-router-dom";

export default function NewPost({onAddPost}) {

  const [enteredBody, setEnteredBody] = useState('');
  const [enteredAuthor, setEnteredAuthor] = useState('');

  function changeBodyHandler(event) {
    setEnteredBody(event.target.value);
  }

  function changeAuthorHandler(event) {
    setEnteredAuthor(event.target.value);
  }

  function submitHandler(event) {
    event.preventDefault();
    const postData = {
      body: enteredBody,
      author: enteredAuthor
    };

    console.log(postData);
    onAddPost(postData);
  }

  return (
    <Modal>
      <form className={classes.form} onSubmit={submitHandler}>
        <p>
          <label htmlFor="body">Text</label>
          <textarea id="body" name="body" required rows={3} onChange={changeBodyHandler}/>
        </p>
        <p>
          <label htmlFor="name">Your name</label>
          <input type="text" id="name" name="name" required onChange={changeAuthorHandler}/>
        </p>
        <p className={classes.actions}>
          <Link to='..'>Cancel</Link>
          <button type="submit">Post</button>
        </p>
      </form>
    </Modal>
  );
}