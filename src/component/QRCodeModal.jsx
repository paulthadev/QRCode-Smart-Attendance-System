/* eslint-disable react/prop-types */
import { QRCodeSVG } from "qrcode.react";

const QRCodeModal = ({ data, onClose }) => {
  return (
    <dialog open className="modal">
      <div className="modal-box modal-bottom sm:modal-middle w-11/12 max-w-5xl">
        <p className="font-bold text-center text-lg sm:text-sm pb-2">QR Code</p>

        <div className="flex justify-center">
          <QRCodeSVG value={data} size={256} />
        </div>

        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default QRCodeModal;
