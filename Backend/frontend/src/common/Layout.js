import BottomNavbar from "./BottomNavbar/BottomNavbar";
import Navbar from "./Navbar";

export default function Layout({ children, sidebarToggleHandler, goToAllChats }) {


  const isMobileScreen = window.innerWidth <= 1007;
  return (
    <>
      {!isMobileScreen && < Navbar sidebarToggleHandler={sidebarToggleHandler} />}
      {children}
      {isMobileScreen && <BottomNavbar goToAllChats={goToAllChats} />}
    </>
  )
}
