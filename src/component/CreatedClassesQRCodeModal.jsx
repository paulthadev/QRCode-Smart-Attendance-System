/* eslint-disable react/prop-types */
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

const QRCodeModal = ({ isOpen, onClose, qrCodeData }) => {
  return (
    <Modal open={isOpen} onClose={onClose} center>
      <h2 className="text-center font-bold text-xl mb-4">QR Code</h2>
      <div className="flex justify-center">
        <img src={qrCodeData} alt="QR Code" className="max-w-full h-auto" />
      </div>
    </Modal>
  );
};

export default QRCodeModal;
