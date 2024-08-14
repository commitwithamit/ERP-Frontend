import { BsInfoCircle } from "react-icons/bs";

export const AlertDanger = ({msg, setIsError}) => {
    return (
        <>
            <div
                id="alert-2"
                className="fixed w-[calc(100%-16px)] left-[50%] translate-x-[-50%] top-2 flex items-center p-4 mb-4 text-gray-900 rounded-lg bg-red-400 dark:bg-gray-800 dark:text-red-400"
                role="alert"
            >
                <BsInfoCircle className="flex-shrink-0 w-4 h-4" />
                <span className="sr-only">Info</span>
                <div className="ms-3 text-sm font-medium">
                    {msg}
                </div>
                <button
                    type="button"
                    className="ms-auto -mx-1.5 -my-1.5 bg-red-300 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
                    data-dismiss-target="#alert-2"
                    aria-label="Close"
                    onClick={()=>setIsError(false)}
                >
                    <span className="sr-only">Close</span>
                    <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                    </svg>
                </button>
            </div>
        </>
    )
}
