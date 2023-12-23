import Navbar from "./Navbar";

export default function Layout({ children, sidebarToggleHandler }) {
  return (
    <>
      <Navbar sidebarToggleHandler={sidebarToggleHandler} />
      {children}
    </>
  )
}
