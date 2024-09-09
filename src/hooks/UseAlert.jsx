import { BsInfoCircle, BsCheck2Circle, BsXOctagon, BsExclamationTriangle } from "react-icons/bs";
import { Alert } from "flowbite-react";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { forwardRef } from "react";

// type = success, info, warning, failure
{/* <UseAlert showAlert={showAlert} setShowAlert={setShowAlert} /> */ }

const UseAlert = forwardRef(({ showAlert, setShowAlert }, ref) => {
    useEffect(() => {
        const removeTimer = setTimeout(() => {
            setShowAlert({
                type: "",
                msg: "",
                show: false,
            });
        }, 5000);
        return () => clearTimeout(removeTimer);
    }, [showAlert.show]);

    return (
        <>
            <motion.div
                style={{
                    position: 'fixed',
                    top: ".5rem",
                    right: "-100%",
                    zIndex:9999,
                }}
                initial={{
                    right: "-100%"
                }}
                animate={{
                    right: "1%"
                }}
                exit={{
                    right: "-100%"
                }}
                transition={{
                    // duration:1,
                    type: "spring",
                    stiffness: 50,
                    damping: 10
                }}
            >
                <Alert
                    color={showAlert.type}
                    onDismiss={() => setShowAlert({
                        type: "",
                        msg: "",
                        show: false,
                    })}
                    className="z-[100] w-[calc(max-content-16px)]"
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
            </motion.div>
        </>
    )
});

export default UseAlert;







// import { BsInfoCircle, BsCheck2Circle, BsXOctagon, BsExclamationTriangle } from "react-icons/bs";
// import { Alert } from "flowbite-react";
// import { useEffect, useState } from "react";

// // type = success, info, warning, failure
// {/* <UseAlert showAlert={showAlert} setShowAlert={setShowAlert} /> */ }

// export default function UseAlert({ showAlert, setShowAlert }) {
//     useEffect(()=>{
//         const removeTimer = setTimeout(()=>{
//             setShowAlert({
//                 type:"",
//                 msg:"",
//                 show:false,
//             });
//         },5000);
//         return ()=>clearTimeout(removeTimer);
//     },[showAlert.show]);

//     return (
//         <>
//             <Alert
//                 color={showAlert.type}
//                 onDismiss={() => setShowAlert({
//                     type: "",
//                     msg: "",
//                     show: false,
//                   })}
//             className={`fixed z-[100] w-[calc(max-content-16px)] right-[-100%] top-2 transition-all duration-300 ${showAlert.show ? 'right-[8px]' : ''}`}
//             >
//             <span className="me-2">
//                 {
//                     showAlert.type === "success" && (
//                         <BsCheck2Circle className="inline-flex me-3 flex-shrink-0 w-4 h-4" />
//                     )
//                 }
//                 {
//                     showAlert.type === "failure" && (
//                         <BsXOctagon className="inline-flex me-3 flex-shrink-0 w-4 h-4" />
//                     )
//                 }
//                 {
//                     showAlert.type === "warning" && (
//                         <BsExclamationTriangle className="inline-flex me-3 flex-shrink-0 w-4 h-4" />
//                     )
//                 }
//                 {
//                     showAlert.type === "info" && (
//                         <BsInfoCircle className="inline-flex me-3 flex-shrink-0 w-4 h-4" />
//                     )
//                 }
//                 {showAlert.msg}
//             </span>
//         </Alert >
//         </>
//     )
// }
