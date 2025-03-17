import classes from './NewPost.module.css';

export default function NewPost({onBodyChange, onAuthorChange, onCancel}) {

  return (
    <form className={classes.form}>
      <p>
        <label htmlFor="body">Text</label>
        <textarea id="body" name="body" required rows={3} onChange={onBodyChange}/>
      </p>
      <p>
        <label htmlFor="name">Your name</label>
        <input type="text" id="name" name="name" required onChange={onAuthorChange}/>
      </p>
      <p className={classes.actions}>
        <button type="button" onClick={onCancel}>Cancel</button>
        <button type="submit">Post</button>
      </p>
    </form>
  );
}