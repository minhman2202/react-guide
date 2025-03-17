import Post from "./Post.jsx";

import classes from './PostsList.module.css';

export default function PostList({posts}) {
  return (
    <ul className={classes.posts}>
      <Post author="John Doe" body="React.js is awesome!"/>
      <Post author="Jane Doe" body="Next.js is great, too!"/>
    </ul>
  );
}