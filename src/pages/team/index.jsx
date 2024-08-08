import { Outlet } from "react-router-dom";
import TeamHeader from "./TeamHeader";

const Team = () => {
  return (
    <div>
      <TeamHeader />
      <div className="p-8 rounded-lg ">
        <Outlet />
      </div>
    </div>
  )
}
export default Team;