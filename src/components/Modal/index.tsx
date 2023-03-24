import { ReactNode } from "react";
import Modal from "react-modal";

interface IModal {
  isOpen: boolean;
  close: () => void;
  children: ReactNode;
}

Modal.setAppElement("#root");

export function ModalComponent({ isOpen, close, children }: IModal) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={close}
      contentLabel="Example Modal"
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      {children}
    </Modal>
  );
}
