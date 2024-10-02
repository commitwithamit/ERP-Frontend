import { motion } from "framer-motion";
import { BsXLg } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { IoAddCircleOutline } from "react-icons/io5";

const CustomModal = ({ isVisible, setShowModal, children }) => {

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setShowModal(false)}
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
            <button className="modal-close" onClick={() => setShowModal(false)}>
              <BsXLg />
            </button>
            <div className="modal-body">
              {/* <IoAddCircleOutline className="add-icon absolute" /> */}
              {children}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default CustomModal;