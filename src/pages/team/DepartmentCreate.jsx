import UsePrivateApi from "../../hooks/UsePrivateApi";
import UseAlert from "../../hooks/UseAlert";
import CustomModal from "../../custom/components/CustomModal";
import TeamCtx from "../../contexts/TeamContext";

import { AnimatePresence } from "framer-motion";
import { useContext, useEffect, useRef, useState } from "react";
import { TextInput, Button, Select } from "flowbite-react";
import { LuLoader2 } from "react-icons/lu";
import { forwardRef } from "react";

const CreateDepartment = forwardRef(({ isVisible, setShowModal, editDeptId }, ref) => {
    // console.log(isVisible, "...", setShowModal, "...", editDeptId); true , fun, undefiened
    const [deptName, setDeptName] = useState("");
    const [managerId, setManagerId] = useState();
    const [managerList, setManagerList] = useState([]);
    const [isLoading, setIsLoading] = useState();
    const [showAlert, setShowAlert] = useState({
        type: "",
        msg: "",
        show: false,
    });
    const inputField = useRef();
    const selectField = useRef();

    const { data, loading, error, post } = UsePrivateApi();
    const { data: putData, loading: putLoading, error: putError, put } = UsePrivateApi();
    const { data: getData, loading: getLoading, error: getError, get } = UsePrivateApi();

    const teamCtx = useContext(TeamCtx);

    // creating department api side-effect handler
    useEffect(() => {
        if (loading) {
            setIsLoading(true);
        }
        if (data) {
            setIsLoading(false);
            setShowAlert({
                type: "success",
                msg: data.message,
                show: true,
            });
            teamCtx.addDeptHandler(data?.department);
            // emptying the input field for next department name
            inputField.current.value = "";
            selectField.current.value = "Select manager";
            selectField.current.style.color = "#6f7682";
            setDeptName("");
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

    // Updating department api side-effect handler
    useEffect(() => {
        if (putData) {
            setIsLoading(false);
            const updatedDept = teamCtx.depts.map((item) => {
                if (item._id === editDeptId) {
                    return { ...item, name: deptName, managerId: putData.data }
                }
                return item;
            });
            teamCtx.addDeptHandler(updatedDept);

            // closing modal box
            setShowAlert({
                type: "success",
                msg: putData.message,
                show: true,
            });
            setTimeout(() => {
                setShowModal(false);
            }, 5010);
        }
        if (putLoading) {
            setIsLoading(true);
        }
        if (putError) {
            setIsLoading(false);
            setShowAlert({
                type: "failure",
                msg: putError,
                show: true,
            });
        }
    }, [putData, putLoading, putError]);

    // getting available manager api side-effect handler
    useEffect(() => {
        if (getData) {
            setIsLoading(false);

            let updatedManagersList = getData.data;
            // updation 
            if (editDeptId) {
                const editThisDept = teamCtx.depts.find((item) => item._id === editDeptId);
                setDeptName(editThisDept.name);
                if (editThisDept?.managerId) {
                    updatedManagersList = [
                        ...updatedManagersList,
                        {
                            _id: editThisDept?.managerId?._id,
                            name: editThisDept?.managerId?.name,
                            email: editThisDept?.managerId?.email,
                            selected: true,
                        }
                    ]
                }
            }
            setManagerList(updatedManagersList);
        }
        if (getLoading) {
            setIsLoading(true);
        }
        if (getError) {
            setIsLoading(false);
            setShowAlert({
                type: "failure",
                msg: getError,
                show: true,
            });
        }
    }, [getData, getLoading, getError]);


    // Api call for getting all available managers
    useEffect(() => {
        get("/api/user/available-managers");
    }, []);
    // console.log(managerList);

    const submitHandler = (e) => {
        e.preventDefault();

        if (!deptName) {
            setShowAlert({
                type: "failure",
                msg: "Please enter department name",
                show: true,
            });
            return;
        }
        if (editDeptId) {
            // update with both fields mandatory 
            if (!managerId) {
                setShowAlert({
                    type: "failure",
                    msg: "Please select a manager",
                    show: true,
                });
                return;
            }
            put(`/api/dept/update-dept/${editDeptId}`, { name: deptName, managerId });
        } else {
            // create
            post("/api/dept/create-dept", { name: deptName, managerId });
        }
    }

    // when editing a department if there is alread and manager selected and no change is being made to the manager then we will set that manager's id otherwise on submit we will get an error "please select a manager"
    useEffect(() => {
        const preSelectedManager = managerList.find((item) => item?.selected);
        if (preSelectedManager) {
            setManagerId(preSelectedManager._id);
        }
    }, [managerList]);
    return (
        <>
            <AnimatePresence>
                {
                    showAlert.show && <UseAlert showAlert={showAlert} setShowAlert={setShowAlert} />
                }
            </AnimatePresence>

            <CustomModal isVisible={isVisible} setShowModal={setShowModal}>
                <form action="#" className="space-y-6" onSubmit={submitHandler}>
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Department Name</h3>
                    <div>
                        <TextInput
                            required
                            autoFocus
                            placeholder="Department name"
                            onChange={(e) => setDeptName(e.target.value)}
                            ref={inputField}
                            value={deptName}
                        />
                    </div>

                    <div>
                        <Select
                            id="managers"
                            ref={selectField}
                            style={{ color: managerList.find(manager => manager.selected) ? "#2b2c2b" : "#6f7682" }}
                            onChange={(e) => { if (e.target.value !== "") e.target.style.color = "#2b2c2b"; setManagerId(e.target.value) }}
                        >

                            <option hidden>Select manager</option>
                            {
                                managerList.length > 0 && managerList.map((item, index) => {
                                    {
                                        return <option
                                            value={item._id}
                                            key={index}
                                            selected={item?.selected}
                                        >
                                            {item?.name || item?.email}
                                        </option>
                                    }
                                })
                            }
                        </Select>
                    </div>

                    <div className="w-full">
                        <Button
                            type="submit"
                            className="btn items-center"
                            disabled={isLoading && true}
                            onClick={submitHandler}
                        >
                            Add
                            {isLoading && <LuLoader2 className='w-4 h-4 animate-spin ml-2' />}
                        </Button>
                    </div>
                </form>
            </CustomModal>

        </>
    )
})

export default CreateDepartment;

