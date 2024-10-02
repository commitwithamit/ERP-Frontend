import Datepicker from "react-tailwindcss-datepicker";
import { TextInput, Button, Label, Radio, Textarea, FileInput } from "flowbite-react";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import CustomModal from "../../custom/components/CustomModal";
import UseAlert from "../../hooks/UseAlert";
import UploadPhoto from "./UploadPhoto";
import noPic from "../../assets/profile.png";

export default function EditProfile({ showModal, setShowModal }) {
    const [userData, setUserData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showAlert, setShowAlert] = useState({
        type: "",
        msg: "",
        show: false,
    });
    const [dob, setDob] = useState({
        startDate: null,
        endDate: null
    });
    // Date of birth handler (it should be 18+)
    // current date - selected date > 18 years
    const handleDOB = (e) => {
        const currDate = new Date();
        const selDate = e.startDate;
        const diffInMilliSec = currDate - selDate;
        const year = diffInMilliSec / (1000 * 60 * 60 * 24 * 365.25);
        if (year > 18) {
            setDob(e)
        } else {
            setDob({
                startDate: null,
                endDate: null
            });
            setShowAlert({
                type: "failure",
                msg: "Age must be 18 years or older.",
                show: true,
            });
        }
    }

    const submitHandler = () => {
        e.preventDefault();

        console.log(userData);

        // Api call
    }

    const getImageHandler = (img) => {
        setUserData({ dp: img });
    }
    return (
        <>
            <AnimatePresence>
                {
                    showAlert.show && <UseAlert showAlert={showAlert} setShowAlert={setShowAlert} />
                }
            </AnimatePresence>
            <CustomModal isVisible={showModal} setShowModal={setShowModal}>
                <form action="#" className="space-y-6 edit-profile" onSubmit={submitHandler}>
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Edit Profile</h3>

                    <UploadPhoto onGetImage={getImageHandler}/>

                    {/* <div className="flex gap-4">
                        <img
                            alt="Bonnie image"
                            height="96"
                            src={noPic}
                            width="96"
                            className="mb-3 rounded-full shadow-lg"
                        />
                        <div>
                            <div>
                                <Label htmlFor="file-upload-helper-text" value="Upload Photo" />
                            </div>
                            <FileInput id="file-upload-helper-text" helperText="PNG & JPG (400x400px)." accept="image/png, image/jpeg" />
                        </div>
                    </div> */}

                    <div>
                        <TextInput
                            required
                            placeholder="Name"
                        // ref={inputField}
                        // value={deptName}
                        />
                    </div>

                    {/* datepicker from : https://react-tailwindcss-datepicker.vercel.app/*/}
                    <div className="datepick">
                        <Datepicker
                            placeholder="Date of Birth"
                            displayFormat="DD/MM/YYYY"
                            useRange={false}
                            asSingle={true}
                            value={dob}
                            onChange={handleDOB}
                        />
                    </div>

                    <div>
                        <fieldset className="flex max-w-md flex-col gap-4">
                            <legend className="mb-2">Gender :</legend>
                            <div className="flex items-center gap-2">
                                <Radio id="male" name="gender" value="Male" defaultChecked />
                                <Label htmlFor="male">Male</Label>

                                <Radio id="female" name="gender" value="Female" />
                                <Label htmlFor="female">Female</Label>
                            </div>
                        </fieldset>
                    </div>

                    <div>
                        <TextInput
                            type="email"
                            required
                            placeholder="Email"
                        // ref={inputField}
                        // value={deptName}
                        />
                    </div>

                    <div>
                        <TextInput
                            type="number"
                            required
                            placeholder="Phone"
                            addon="+91"
                            className="addon"
                        />
                    </div>

                    <div>
                        <Textarea
                            placeholder="Address..."
                            required rows={4}
                        />
                    </div>


                    <div className="w-full">
                        <Button
                            type="submit"
                            className="btn items-center"
                            disabled={isLoading && true}
                            onClick={submitHandler}
                        >
                            Save
                            {isLoading && <LuLoader2 className='w-4 h-4 animate-spin ml-2' />}
                        </Button>
                    </div>
                </form>
            </CustomModal>
        </>
    )
}
