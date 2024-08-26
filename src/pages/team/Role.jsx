import { BsPlusLg, BsSearch, BsFolderX } from "react-icons/bs";
import RoleList from "./RoleList";
import { useState } from "react";
import CreateRole from "./RoleCreate";

const Role = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <section className="employee-section">
        <div className="employee">
          <span>
            <h5>Roles</h5>
          </span>

          {/* search box and create role btn */}
          <span>

            <div className="dark:bg-gray-900">
              <label htmlFor="table-search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                  <BsSearch className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </div>
                <input type="text" id="table-search" className="tabs active block py-2.5 ps-10 text-sm text-gray-900 rounded-lg w-64 focus:ring-stone-400 focus:border-stone-400 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search here..." />
              </div>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className='btn font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30'>
              <BsPlusLg className="w-4 h-4 me-2" />
              Create Role
            </button>
          </span>
        </div>

        {
          <RoleList />
        }
      </section>


      <CreateRole isVisible={showModal} setShowModal={setShowModal} />

      {/* {emptyTable && (<div className="nodata"><BsFolderX /> No records to display here.</div>)} */}
    </>

  )
}
export default Role;