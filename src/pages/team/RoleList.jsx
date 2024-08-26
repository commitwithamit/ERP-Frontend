import { useContext, useEffect, useState } from "react";
import UsePrivateApi from "../../hooks/UsePrivateApi";
import UseAlert from "../../hooks/UseAlert";
import TeamCtx from "../../contexts/TeamContext";
import CreateRole from "./RoleCreate";

import { Table, Tooltip } from "flowbite-react";
import { BsPencilSquare, BsTrash3, BsFolderX } from "react-icons/bs";
import { LuLoader2 } from "react-icons/lu";
import ConfirmationModal from "../../custom/components/ConfirmationModal";


const RoleList = () => {
    const [editRoleId, setEditRoleId] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [showAlert, setShowAlert] = useState({
        type: "",
        msg: "",
        show: false,
    });

    const { data, loading, error, get } = UsePrivateApi();
    const { data:delData, loading:delLoading, error:delError, del } = UsePrivateApi();
    const teamCtx = useContext(TeamCtx);

    // for handling get api side-effect
    useEffect(() => {
        if (data) {
            setIsLoading(false);
            teamCtx.addRoleHandler(data?.data);
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

    // for handling get api side-effect
    useEffect(() => {
        if (delData) {
            setIsLoading(false);
            setShowAlert({
                type: "success",
                msg: delData.message,
                show: true,
            });
            const updatedRoles = teamCtx.roles.filter(
                (items)=>items._id !== editRoleId
            );
            teamCtx.addRoleHandler(updatedRoles);
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

    useEffect(() => {
       get("/api/role/get-roles");
    }, []);

    const handleDeleteConfirmation = (val) => {
        if(val){
            del(`/api/role/delete-role/${editRoleId}`);
        }
        setShowConfirmation(false);
    }
    
    return (
        <>
            <UseAlert showAlert={showAlert} setShowAlert={setShowAlert} />

            {isLoading && <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                <LuLoader2 className='w-6 h-6 animate-spin ml-2' />
            </div>}

            <CreateRole isVisible={showModal} setShowModal={setShowModal} editRoleId={editRoleId} />

            <ConfirmationModal name={"role"} showConfirmation={showConfirmation} setShowConfirmation={setShowConfirmation} handleDeleteConfirmation={handleDeleteConfirmation}/>

            {
                teamCtx.roles.length > 0 ? (
                    <div className="table-con overflow-x-auto">
                        <Table hoverable className="table-bg">
                            <Table.Head className="sticky top-0">
                                <Table.HeadCell>Name</Table.HeadCell>
                                <Table.HeadCell className="w-[100px]">Action</Table.HeadCell>
                            </Table.Head>
                            <Table.Body className="divide-y">
                                {
                                    teamCtx.roles.map((role, index) => {
                                        return (
                                            <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800 hover:rounded-lg">
                                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                    {role.name}
                                                </Table.Cell>
                                                <Table.Cell className="actions w-[100px]">
                                                    <Tooltip content={role.name === "Admin"? "Not Allowed" : "Edit"} animation="duration-500">
                                                        <button
                                                            className={`edit font-medium text-blue-600 dark:text-blue-500 hover:underline ${role.name === 'Admin' && 'off'}`}
                                                            data-tooltip-target="tooltip-animation"
                                                            onClick={()=>{
                                                                setShowModal(true);
                                                                setEditRoleId(role._id);
                                                            }}
                                                            disabled={role.name === "Admin"}
                                                        >
                                                            <BsPencilSquare />
                                                        </button>
                                                    </Tooltip>
                                                    <Tooltip content={role.name === "Admin"? "Not Allowed" : "Delete"} animation="duration-500">
                                                        <button
                                                            className={`delete font-medium text-blue-600 dark:text-blue-500 hover:underline ${role.name === 'Admin' && 'off'}`}
                                                            data-tooltip-target="tooltip-animation"
                                                            disabled={role.name === "Admin"}
                                                            onClick={()=>{
                                                                setShowConfirmation(true);
                                                                setEditRoleId(role._id);
                                                            }}
                                                        >
                                                            <BsTrash3/>
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

export default RoleList;
