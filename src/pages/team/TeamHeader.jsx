import { Link, NavLink } from 'react-router-dom';
import { BsPeople, BsBuilding, BsPersonGear } from "react-icons/bs";

const TeamHeader = () => {
  return (
    <div className='team-header'>
      <span className='flex gap-4'>
        <NavLink to="./employee"
          className="tabs btn focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 ">
          <BsPeople className='w-4 h-4 me-2' />
          Employee
        </NavLink>
        <NavLink to="./department" className='tabs btn focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30'>
          <BsBuilding className='w-4 h-4 me-2' />
          Department
        </NavLink>
        <NavLink to="./role" className='tabs btn focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30'>
          <BsPersonGear className='w-4 h-4 me-2' />
          Role
        </NavLink>
      </span>
    </div>
  )
}
export default TeamHeader;