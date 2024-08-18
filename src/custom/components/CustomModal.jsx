
// import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { Modal } from "flowbite-react";
import { useState } from "react";

export default function CustomModal({isVisible, setShowModal, children}) {

  function onCloseModal() {
    setShowModal(false);
  }

  return (
    <>
      <Modal dismissible show={isVisible} size="md" onClose={onCloseModal} popup className="modal">
        <Modal.Header />
        <Modal.Body>
          {children}
        </Modal.Body>
      </Modal>
    </>
  );
}
