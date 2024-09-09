import { Link } from "react-router-dom";
import { Table, Tooltip } from "flowbite-react";
import { BsPencilSquare, BsTrash3 } from "react-icons/bs";


const EmployeeList = () => {
    return (
        <>
            <div className="table-con overflow-x-auto">
                <Table hoverable className="table-bg">
                    <Table.Head className="sticky top-0">
                        <Table.HeadCell>Name</Table.HeadCell>
                        <Table.HeadCell>Email</Table.HeadCell>
                        <Table.HeadCell>Role</Table.HeadCell>
                        <Table.HeadCell>Department</Table.HeadCell>
                        {/* <Table.HeadCell className="w-[100px]">Action</Table.HeadCell> */}
                    </Table.Head>
                    <Table.Body className="divide-y">
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:rounded-lg">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                
                            </Table.Cell>
                            {/* <Table.Cell className="actions w-[100px]">
                                <Tooltip content="Edit" animation="duration-500">
                                    <button
                                        className="edit font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                        data-tooltip-target="tooltip-animation"
                                    >
                                        <BsPencilSquare />
                                    </button>
                                </Tooltip>
                                <Tooltip content="Delete" animation="duration-500">
                                    <button
                                        className="delete font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                        data-tooltip-target="tooltip-animation"
                                    >
                                        <BsTrash3 />
                                    </button>
                                </Tooltip>
                            </Table.Cell> */}
                        </Table.Row>
                    </Table.Body>
                </Table>
            </div>
        </>
    )
}

export default EmployeeList;
