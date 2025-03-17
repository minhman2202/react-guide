import MainHeader from "../components/MainHeader.jsx";
import {Outlet} from "react-router-dom";

export default function RootLayout({children}) {
  return (
    <>
      <MainHeader/>
      <Outlet/>
    </>
  );
}