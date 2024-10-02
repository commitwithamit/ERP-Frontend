import { Tooltip } from "flowbite-react";
import { LiaUserEditSolid } from "react-icons/lia";
import { TfiLock } from "react-icons/tfi";
import { Link } from "react-router-dom";
import { useState } from "react";

import noProfile from "../../assets/profile.png";
import EditProfile from "./EditProfile";
import { AnimatePresence } from "framer-motion";

export default function PersonalDetails() {
    const [showModal, setShowModal] = useState(false);


    return (
        <>
            <div className="col shadow-box w-[50%] h-full">
                <div className="flex justify-between items-start flex-wrap gap-4 border-b border-zinc-400 pb-3">
                    {/* Profile Picture */}
                    <img src={noProfile} alt="Name profile" className="w-28 h-28 rounded-[50%]" />
                    {/* Edit & Password Change Buttons */}
                    <span className="flex gap-2">
                        <Tooltip content="Edit Profile" animation="duration-500" placement="top">
                            <button
                                className="square-btn"
                                data-tooltip-target="tooltip-animation"
                                onClick={() => setShowModal(true)}
                            >
                                <LiaUserEditSolid />
                            </button>
                        </Tooltip>

                        <Tooltip content="Change Password" animation="duration-500" placement="top">
                            <button
                                className="square-btn lock"
                                data-tooltip-target="tooltip-animation"
                            >
                                <TfiLock />
                            </button>
                        </Tooltip>
                    </span>
                    {/* Name & Designation */}
                    <div className="basis-full">
                        <h4 className="text-primary">Amit Kumar</h4>
                        <p className="text-primary-light">Frontend Developer</p>
                    </div>
                </div>

                {/* Personal Details */}
                <div className="pt-3">
                    <em className="font-medium mb-2 block">Personal Details:</em>
                    <div className="text-size-sm">
                        <table>
                            <tbody className="text-left leading-9">
                                <tr>
                                    <td>Age :</td>
                                    <td>28</td>
                                </tr>
                                <tr>
                                    <td>Gender :</td>
                                    <td>Male</td>
                                </tr>
                                <tr>
                                    <td>Date of Birth :</td>
                                    <td>27/08/1996</td>
                                </tr>
                                <tr>
                                    <td>Phone :</td>
                                    <td><Link to="tel:8989898989">+91-8989898989</Link></td>
                                </tr>
                                <tr>
                                    <td>Email :</td>
                                    <td><Link to="mailto:akak@gmail.com">akak6199@gmail.com</Link></td>
                                </tr>
                                <tr>
                                    <td>Address :</td>
                                    <td>Rishivihar, Dehradun</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

            <AnimatePresence>
                {
                    showModal && <EditProfile showModal={showModal} setShowModal={setShowModal} />
                }
            </AnimatePresence>
        </>
    )
}
