import { Button, TextInput } from "flowbite-react";
import { LuLoader2 } from "react-icons/lu";
import CustomModal from "../../custom/components/CustomModal";
import UsePrivateApi from "../../hooks/UsePrivateApi";
import UseAlert from "../../hooks/UseAlert";
import { useEffect, useState, useRef } from "react";

const CreateRole = ({ isVisible, setShowModal }) => {
    const [role, setRole] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [showAlert, setShowAlert] = useState({
        type: "",
        msg: "",
        show: false,
    });
    const inputField = useRef();

    const { data, loading, error, post } = UsePrivateApi();

    useEffect(() => {
        if (data) {
            setIsLoading(false);
            setShowAlert({
                type: "success",
                msg: "Role created successfully.",
                show: true,
            });
            // empty the input field and role state after successfully adding the role
            inputField.current.value = "";
            setRole("");
        }
        if (loading) {
            setIsLoading(true);
        }
        if (error) {
            setIsLoading(false);
            setIsError(error);
        }
    }, [data, loading, error])


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

        post("/api/role/create-role", { name: role });
    }

    return (
        <>
            <UseAlert showAlert={showAlert} setShowAlert={setShowAlert} />
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
                        />
                    </div>
                    <div className="w-full">
                        <Button
                            type="submit"
                            className="btn items-center"
                            disabled={isLoading && true}
                            onClick={submitHandler}
                        >
                            Create
                            {isLoading && <LuLoader2 className='w-4 h-4 animate-spin ml-2' />}
                        </Button>
                    </div>
                </form>
            </CustomModal>
        </>
    )
}


export default CreateRole;