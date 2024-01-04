import { useMediaQuery } from "@mui/material";
import BottomNavbar from "./BottomNavbar/BottomNavbar";
import Navbar from "./Navbar";

export default function Layout({ children, sidebarToggleHandler, goToAllChats }) {
  const isMobileScreen = useMediaQuery('(max-width: 1007px)', { defaultMatches: null });

  return (
    <>
      <Navbar />
      {children}
      {isMobileScreen && <BottomNavbar goToAllChats={goToAllChats} />}
    </>
  )
}
