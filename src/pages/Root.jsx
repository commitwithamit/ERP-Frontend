import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../layouts/components/Sidebar";
import Main from "../layouts/components/Main";
import { useEffect } from "react";


export default function Root() {
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 992px)");

    const handleScreenChange = (e) => {
      setOpenMenu(e.matches);
    }

    // setting initial state and calling the function on load
    handleScreenChange(mediaQuery);

    // check for screen size changes
    mediaQuery.addEventListener("change", handleScreenChange);

    // Cleanup event listener on unmount
    return () => mediaQuery.removeEventListener('change', handleScreenChange);

  }, []);


  return (
    <div className="main-container">
      <Sidebar openMenu={openMenu} setOpenMenu={setOpenMenu} />
      <Main openMenu={openMenu} >
        <Outlet />
      </Main>
    </div>
  )
}