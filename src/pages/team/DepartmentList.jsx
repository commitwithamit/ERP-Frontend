import UsePrivateApi from "../../hooks/UsePrivateApi";
import UseAlert from "../../hooks/UseAlert";
import TeamCtx from "../../contexts/TeamContext";
import CreateDepartment from "./DepartmentCreate";
import ConfirmationModal from "../../custom/components/ConfirmationModal";

import { AnimatePresence } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { Table, Tooltip } from "flowbite-react";
import { BsPencilSquare, BsTrash3, BsFolderX } from "react-icons/bs";
import { LuLoader2 } from "react-icons/lu";


const DepartmentList = () => {
    const [editDeptId, setEditDeptId] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showAlert, setShowAlert] = useState({
        type: "",
        msg: "",
        show: false,
    });

    const { data, loading, error, get } = UsePrivateApi();
    const { data: delData, loading: delLoading, error: delError, del } = UsePrivateApi();
    const teamCtx = useContext(TeamCtx);

    // getting all the departments data
    useEffect(() => {
        get("/api/dept/get-depts");
    }, []);

    // for handling get all depratment api side-effect
    useEffect(() => {
        if (data) {
            setIsLoading(false);
            teamCtx.addDeptHandler(data?.data);
        }
        if (loading) {
            setIsLoading(true);
        }
        if (error) {
            setIsLoading(false);
            setShowAlert({
                type: "failure",
                msg: error,
                show: true,
            });
        }
    }, [data, loading, error]);

    // for handling delete api side-effect
    useEffect(() => {
        if (delData) {
            setIsLoading(false);
            setShowAlert({
                type: "success",
                msg: delData.message,
                show: true,
            });
            const updatedDept = teamCtx.depts.filter(
                (items) => items._id !== editDeptId
            );
            teamCtx.addDeptHandler(updatedDept);
        }
        if (delLoading) {
            setIsLoading(true);
        }
        if (delError) {
            setIsLoading(false);
            setShowAlert({
                type: "failure",
                msg: delError,
                show: true,
            });
        }
    }, [delData, delLoading, delError]);

    const handleDeleteConfirmation = (val) => {
        if (val) {
            del(`/api/dept/delete-dept/${editDeptId}`);
        }
        setShowConfirmation(false);
    }
    return (
        <>
            <AnimatePresence mode="popLayout">
                {showAlert.show && <UseAlert showAlert={showAlert} setShowAlert={setShowAlert} />}
            </AnimatePresence>

            {isLoading && <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                <LuLoader2 className='w-6 h-6 animate-spin ml-2' />
            </div>}

            {showModal && <CreateDepartment isVisible={showModal} setShowModal={setShowModal} editDeptId={editDeptId} />}

            {showConfirmation && <ConfirmationModal name={"Department"} showConfirmation={showConfirmation} setShowConfirmation={setShowConfirmation} handleDeleteConfirmation={handleDeleteConfirmation} />}

            {
                teamCtx.depts.length > 0 ? (
                    <div className="table-con overflow-x-auto">
                        <Table hoverable className="table-bg">
                            <Table.Head className="sticky top-0">
                                <Table.HeadCell>Department</Table.HeadCell>
                                <Table.HeadCell>Manager</Table.HeadCell>
                                <Table.HeadCell className="w-[100px]">Action</Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {
                                    teamCtx.depts.map((dept, index) => {
                                        return (
                                            <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:rounded-lg">
                                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                    {dept.name}
                                                </Table.Cell>

                                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                    {dept.managerId?.name || dept.managerId?.email || "-"}
                                                </Table.Cell>

                                                <Table.Cell className="actions w-[100px]">
                                                    <Tooltip content={dept.name?.toLowerCase() === "management" ? "Not Allowed" : "Edit"} animation="duration-500">
                                                        <button
                                                            className={`edit font-medium text-blue-600 dark:text-blue-500 hover:underline ${dept.name?.toLowerCase() === "management" && 'off'}`}
                                                            data-tooltip-target="tooltip-animation"
                                                            onClick={() => {
                                                                setShowModal(true);
                                                                setEditDeptId(dept._id);
                                                            }}
                                                            disabled={dept.name?.toLowerCase() === "management"}
                                                        >
                                                            <BsPencilSquare />
                                                        </button>
                                                    </Tooltip>
                                                    <Tooltip content={dept.name?.toLowerCase() === "management" ? "Not Allowed" : "Delete"} animation="duration-500">
                                                        <button
                                                            className={`delete font-medium text-blue-600 dark:text-blue-500 hover:underline ${dept.name?.toLowerCase() === "management" && 'off'}`}
                                                            data-tooltip-target="tooltip-animation"
                                                            onClick={() => {
                                                                setShowConfirmation(true);
                                                                setEditDeptId(dept._id);
                                                            }}
                                                            disabled={dept.name?.toLowerCase() === "management"}
                                                        >
                                                            <BsTrash3 />
                                                        </button>
                                                    </Tooltip>
                                                </Table.Cell>
                                            </Table.Row>
                                        )
                                    })
                                }
                            </Table.Body>
                        </Table>
                    </div>
                ) : (
                    !isLoading && <div className="nodata"><BsFolderX /> No records to display here.</div>
                )
            }
        </>
    )
}

export default DepartmentList;
