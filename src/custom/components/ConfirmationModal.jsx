import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { BsXLg } from "react-icons/bs";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

export default function ConfirmationModal({ name, showConfirmation, setShowConfirmation, handleDeleteConfirmation }) {

    return (
        <>
            <AnimatePresence>
                {
                    showConfirmation && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowConfirmation(false)}
                            className='modal-con'
                        >
                            <motion.div
                                initial={{ scale: 0, rotate: "12.5deg" }}
                                animate={{ scale: 1, rotate: "0deg" }}
                                exit={{ scale: 0, rotate: "12.5deg" }}
                                onClick={(e) => e.stopPropagation()}
                                className="modal-content"
                            >
                                <div>
                                    <button className="modal-close" onClick={() => setShowConfirmation(false)}>
                                        <BsXLg />
                                    </button>
                                    <div className="modal-body confirmation">
                                    <HiOutlineExclamationCircle className="bg-icon"/>
                                        <div className="text-center relative">
                                            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-primary dark:text-gray-200" />
                                            <h3 className="mb-5 text-lg font-normal text-zinc-800 dark:text-gray-400">
                                                Are you sure you want to delete this {name}?
                                            </h3>
                                            <div className="flex justify-center gap-4">
                                                <Button color="failure" onClick={() => handleDeleteConfirmation(true)}>
                                                    {"Yes, I'm sure"}
                                                </Button>
                                                <Button color="gray" onClick={() => handleDeleteConfirmation(false)} className="hover:ring-stone-400">
                                                    No, cancel
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )
                }
            </AnimatePresence>
        </>
    );
}
{/* <Modal dismissible show={showConfirmation} size="md" onClose={onCloseModal} popup className="modal">
    <Modal.Header />
    <Modal.Body>
        <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-primary dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this {name}?
            </h3>
            <div className="flex justify-center gap-4">
                <Button color="failure" onClick={() => handleDeleteConfirmation(true)}>
                    {"Yes, I'm sure"}
                </Button>
                <Button color="gray" onClick={() => handleDeleteConfirmation(false)} className="hover:ring-stone-400">
                    No, cancel
                </Button>
            </div>
        </div>
    </Modal.Body>
</Modal> */}