import { BsInfoCircle, BsCheck2Circle, BsXOctagon, BsExclamationTriangle } from "react-icons/bs";
import { Alert } from "flowbite-react";
import { useEffect, useState } from "react";

// type = success, info, warning, failure
{/* <UseAlert showAlert={showAlert} setShowAlert={setShowAlert} /> */ }

export default function UseAlert({ showAlert, setShowAlert }) {

    useEffect(()=>{
        const removeTimer = setTimeout(()=>{
            setShowAlert({
                type:"",
                msg:"",
                show:false,
            });
        },3000);
        return ()=>clearTimeout(removeTimer);
    });

    return (
        <>
            <Alert
                color={showAlert.type}
                onDismiss={() => setShowAlert({
                    type: "",
                    msg: "",
                    show: false,
                  })}
            className={`fixed z-[100] w-[calc(max-content-16px)] right-[-100%] top-2 transition-all duration-300 ${showAlert.show ? 'right-[8px]' : ''}`}
            >
            <span className="me-2">
                {
                    showAlert.type === "success" && (
                        <BsCheck2Circle className="inline-flex me-3 flex-shrink-0 w-4 h-4" />
                    )
                }
                {
                    showAlert.type === "failure" && (
                        <BsXOctagon className="inline-flex me-3 flex-shrink-0 w-4 h-4" />
                    )
                }
                {
                    showAlert.type === "warning" && (
                        <BsExclamationTriangle className="inline-flex me-3 flex-shrink-0 w-4 h-4" />
                    )
                }
                {
                    showAlert.type === "info" && (
                        <BsInfoCircle className="inline-flex me-3 flex-shrink-0 w-4 h-4" />
                    )
                }
                {showAlert.msg}
            </span>
        </Alert >
        </>
    )
}
