import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function ConfirmationModal({ name, showConfirmation, setShowConfirmation, handleDeleteConfirmation }) {

    const onCloseModal = () => {
        setShowConfirmation(false);
    }

    return (
        <>
            <Modal dismissible show={showConfirmation} size="md" onClose={onCloseModal} popup className="modal">
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
            </Modal>
        </>
    );
}
