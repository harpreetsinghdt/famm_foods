import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children, open, onClose, cls = "" }) => {
  const dailog = useRef();
  useEffect(() => {
    const modal = dailog.current;
    if (open) {
      modal.showModal();
    }
    return () => {
      modal.close();
    };
  }, [open]);
  return createPortal(
    <dialog ref={dailog} className={`modal ${cls}`} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
};
export default Modal;
