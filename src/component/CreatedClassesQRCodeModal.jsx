/* eslint-disable react/prop-types */
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

const CreatedClassesQRCodeModal = ({ isOpen, onClose, qrCodeData }) => {
  // Encode QR code data as a URL
  const encodedQRCodeData = encodeURI(qrCodeData);

  return (
    <Modal open={isOpen} onClose={onClose} center>
      <h2 className="text-center font-bold text-xl mb-4">QR Code</h2>
      <div className="flex justify-center">
        <img
          src={encodedQRCodeData}
          alt="QR Code"
          className="max-w-full h-auto"
        />
      </div>
    </Modal>
  );
};

export default CreatedClassesQRCodeModal;
