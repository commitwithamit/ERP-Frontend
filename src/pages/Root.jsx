import Header from "../layouts/components/Header";
import SideMenu from "../layouts/components/SideMenu";
import Main from "../layouts/components/Main";

import {Outlet} from "react-router-dom";


export default function Root() {
  return (
    <>
        <Header/>
        <div className="flex gap-2">
            <SideMenu/>
            <Main>
                <Outlet/>
            </Main>
        </div>
    </>
  )
}
