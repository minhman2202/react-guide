import {Outlet} from "react-router-dom";

import PostsList from "../components/PostsList.jsx";

function Posts() {
  return (
    <>
      <Outlet/>
      <main>
        <PostsList/>
      </main>
    </>
  );
}

export default Posts;
