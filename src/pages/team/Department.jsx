const Department = () => {
  return (
    <div className="flex justify-between items-center">
      <span>Department</span>
      <span>
        <button className='bg-stone-400 hover:bg-stone-600 text-gray-900 hover:text-gray-200 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30'>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            fill="currentColor"
            className="bi bi-plus-lg  w-4 h-4 me-2"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
            />
          </svg>

          Add Department
        </button>
      </span>
    </div>
  )
}
export default Department;