import classes from './NewPost.module.css';

export default function NewPost(props) {

  return (
    <form className={classes.form}>
      <p>
        <label htmlFor="body">Text</label>
        <textarea id="body" name="body" required rows={3} onChange={props.onBodyChange} />
      </p>
      <p>
        <label htmlFor="name">Your name</label>
        <input type="text" id="name" name="name" required onChange={props.onAuthorChange} />
      </p>
    </form>
  );
}