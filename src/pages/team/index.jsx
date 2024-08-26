import { Outlet } from "react-router-dom";
import TeamHeader from "./TeamHeader";
import { TeamContext } from "../../contexts/TeamContext";

const Team = () => {
  return (
    <div>
      <TeamHeader />
      <div className="rounded-lg ">
        <TeamContext>
          <Outlet />
        </TeamContext>
      </div>
    </div>
  )
}
export default Team;