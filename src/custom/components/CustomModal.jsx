// import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { Modal } from "flowbite-react";
import { motion, AnimatePresence } from "framer-motion";
import { forwardRef } from "react";

const CustomModal = forwardRef(({ isVisible, setShowModal, children }, ref) => {

  function onCloseModal() {
    setShowModal(false);
  }

  return (
    <>

      <motion.div
        className="yoyo"
        style={{
          // transform:"scale(0.8)",
          // opacity:0
          background:"red",
        }}
        initial={{ opacity: 0, scale: 0.8 }}  // starting animation state
        animate={{ opacity: 1, scale: 1 }}    // state when modal is open
        exit={{ opacity: 0, scale: 0.8 }}     // state when modal is closed
        transition={{ duration: 0.3 }}
      >
        <Modal dismissible show={isVisible} size="md" onClose={onCloseModal} popup className="modal" ref={ref}>
          <Modal.Header />
          <Modal.Body>
            {children}
          </Modal.Body>
        </Modal>
      </motion.div>

    </>
  );
});

export default CustomModal;