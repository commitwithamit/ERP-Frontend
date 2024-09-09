import CustomModal from "../../custom/components/CustomModal";
import UsePrivateApi from "../../hooks/UsePrivateApi";
import UseAlert from "../../hooks/UseAlert";
import TeamCtx from "../../contexts/TeamContext";

import { AnimatePresence } from "framer-motion";
import { Button, TextInput } from "flowbite-react";
import { LuLoader2 } from "react-icons/lu";
import { useEffect, useState, useRef, useContext } from "react";

const CreateRole = ({ isVisible, setShowModal, editRoleId }) => {
    const [role, setRole] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const inputField = useRef();
    const [showAlert, setShowAlert] = useState({
        type: "",
        msg: "",
        show: false,
    });

    const { data, loading, error, post } = UsePrivateApi();
    const {
        data: patchData,
        loading: patchLoading,
        error: patchError,
        patch
    } = UsePrivateApi();

    const teamCtx = useContext(TeamCtx);

    // setting role name state to the one that is being edited 
    useEffect(() => {
        if (editRoleId) {
            setRole(teamCtx.roles.find((item) => item._id === editRoleId).name);
        }
    }, [editRoleId]);

    // for handling updation api side-effects
    useEffect(() => {
        if (patchData) {
            setIsLoading(false);
            setShowAlert({
                type: "success",
                msg: patchData?.message,
                show: true,
            });
            const updatedRoles = teamCtx.roles.map((item) => {
                if (item._id === editRoleId) {
                    return { ...item, name: role }
                }
                return item;
            });
            teamCtx.addRoleHandler(updatedRoles);
            // closing modal box
            setShowModal(false);
        }
        if (patchLoading) {
            setIsLoading(true);
        }
        if (patchError) {
            setIsLoading(false);
            setShowAlert({
                type: "failure",
                msg: patchError,
                show: true,
            });
        }
    }, [patchData, patchLoading, patchError]);


    // for handling create role side effects
    useEffect(() => {
        if (data) {
            setIsLoading(false);
            setShowAlert({
                type: "success",
                msg: data?.message,
                show: true,
            });
            teamCtx.addRoleHandler(data?.role);
            console.log(data?.role);
            // empty the input field and role state after successfully adding the role
            inputField.current.value = "";
            setRole("");
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


    const submitHandler = (e) => {
        e.preventDefault();

        if (!role) {
            setShowAlert({
                type: "failure",
                msg: "Please enter a role name.",
                show: true,
            });
            return;
        }

        if (!editRoleId) {
            post("/api/role/create-role", { name: role });
        } else {
            patch(`/api/role/edit-role/${editRoleId}`, { name: role });
        }
    }

    return (
        <>
            <AnimatePresence mode="popLayout">
                {
                    showAlert.show &&
                    <UseAlert showAlert={showAlert} setShowAlert={setShowAlert} />
                }
            </AnimatePresence>
            
            <CustomModal isVisible={isVisible} setShowModal={setShowModal}>
                <form action="#" className="space-y-6" onSubmit={submitHandler}>
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Role/Designation Name</h3>
                    <div>
                        <TextInput
                            required
                            autoFocus
                            placeholder="Role name"
                            onChange={(e) => setRole(e.target.value)}
                            ref={inputField}
                            value={role}
                        />
                    </div>
                    <div className="w-full">
                        <Button
                            type="submit"
                            className="btn items-center"
                            disabled={isLoading && true}
                            onClick={submitHandler}
                        >
                            {
                                editRoleId ? "Update" : "Create"
                            }
                            {isLoading && <LuLoader2 className='w-4 h-4 animate-spin ml-2' />}
                        </Button>
                    </div>
                </form>
            </CustomModal>
        </>
    )
}


export default CreateRole;