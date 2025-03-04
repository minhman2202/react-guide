import {Outlet} from "react-router-dom";

export default function EventsRootLayout() {
  return (
    <>
      <h1>Events Root Layout</h1>
      <Outlet/>
    </>
  );
}