import { motion, AnimatePresence } from "framer-motion";
import { BsXLg } from "react-icons/bs";
const CustomModal = ({ isVisible, setShowModal, children }) => {

  return (
    <>
      <AnimatePresence>
        {
          isVisible && (
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
                    {children}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )
        }
      </AnimatePresence>

    </>
  );
};

export default CustomModal;