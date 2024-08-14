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
                        <Table.HeadCell>Phone</Table.HeadCell>
                        <Table.HeadCell>Email</Table.HeadCell>
                        <Table.HeadCell>Role</Table.HeadCell>
                        <Table.HeadCell>Action</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                Amit Kumar
                            </Table.Cell>
                            <Table.Cell>8770245118</Table.Cell>
                            <Table.Cell>amit@gmail.com</Table.Cell>
                            <Table.Cell>Admin</Table.Cell>
                            <Table.Cell className="actions">
                                <Tooltip content="Edit" animation="duration-500">
                                    <Link
                                        href="#"
                                        className="edit font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                        data-tooltip-target="tooltip-animation"
                                    >
                                        <BsPencilSquare />
                                    </Link>
                                </Tooltip>
                                <Tooltip content="Delete" animation="duration-500">
                                    <Link
                                        href="#"
                                        className="delete font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                        data-tooltip-target="tooltip-animation"
                                    >
                                        <BsTrash3 />
                                    </Link>
                                </Tooltip>
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                Yogita Rawat
                            </Table.Cell>
                            <Table.Cell>9897245132</Table.Cell>
                            <Table.Cell>yogitarawat@gmail.com</Table.Cell>
                            <Table.Cell>Associate Developer</Table.Cell>
                            <Table.Cell className="actions">
                                <Tooltip content="Edit" animation="duration-500">
                                    <Link
                                        href="#"
                                        className="edit font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                        data-tooltip-target="tooltip-animation"
                                    >
                                        <BsPencilSquare />
                                    </Link>
                                </Tooltip>
                                <Tooltip content="Delete" animation="duration-500">
                                    <Link
                                        href="#"
                                        className="delete font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                        data-tooltip-target="tooltip-animation"
                                    >
                                        <BsTrash3 />
                                    </Link>
                                </Tooltip>
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </div>
        </>
    )
}

export default EmployeeList;
