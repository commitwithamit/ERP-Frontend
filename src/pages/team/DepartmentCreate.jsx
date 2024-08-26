import UsePrivateApi from "../../hooks/UsePrivateApi";
import UseAlert from "../../hooks/UseAlert";
import CustomModal from "../../custom/components/CustomModal";
import TeamCtx from "../../contexts/TeamContext";
import { useContext, useEffect, useRef, useState } from "react";

import { TextInput, Button } from "flowbite-react";
import { LuLoader2 } from "react-icons/lu";

const CreateDepartment = ({isVisible, setShowModal}) => {
    const [dept, setDept] = useState();
    const [isLoading, setIsLoading] = useState();
    const [showAlert, setShowAlert] = useState({
        type: "",
        msg: "",
        show: false,
    });
    const inputField = useRef();

    const {data, loading, error, post} = UsePrivateApi;

    const teamCtx = useContext(TeamCtx);

    useEffect(()=>{
        if(loading){
            setIsLoading(true);
        }
        if(data){
            setIsLoading(false);
            setShowAlert({
                type: "success",
                msg: "Please enter department name.",
                show: true,
            });
            teamCtx.addDeptHandler(data?.depts);
            // emptying the input field for next department name 
            inputField.current.value = "";
            setDept("");
        }
        if(error){
            setIsLoading(false);
            setShowAlert({
                type: "failure",
                msg: "Please enter department name.",
                show: true,
            });
        }
    }, [data, loading, error]);

    const submitHandler = (e) => {
        e.preventDefault();

        if (!dept) {
            setShowAlert({
                type: "failure",
                msg: "Please enter department name.",
                show: true,
            });
            return;
        }

        post("/api/dept/create-dept", {name: dept});
    }

    return (
        <>
            <UseAlert showAlert={showAlert} setShowAlert={setShowAlert} />
            <CustomModal isVisible={isVisible} setShowModal={setShowModal}>
                <form action="#" className="space-y-6" onSubmit={submitHandler}>
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Department Name</h3>
                    <div>
                        <TextInput
                            required
                            autoFocus
                            placeholder="Department name"
                            onChange={(e) => setDept(e.target.value)}
                            ref={inputField}
                        />
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
}

export default CreateDepartment;

