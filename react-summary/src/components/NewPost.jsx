import {useState} from "react";

import classes from './NewPost.module.css';

export default function NewPost() {

  const [enteredBody, setEnteredBody] = useState('');

  function changeBodyHandler(event) {
    setEnteredBody(event.target.value);
  }

  return (
    <form className={classes.form}>
      <p>
        <label htmlFor="body">Text</label>
        <textarea id="body" name="body" required rows={3} onChange={changeBodyHandler} />
      </p>
      {enteredBody}
      <p>
        <label htmlFor="name">Your name</label>
        <input type="text" id="name" name="name" required/>
      </p>
    </form>
  );
}