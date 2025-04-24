import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import './QRModal.css';

const QRModal = ({ uuid, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="modal-close" onClick={onClose}>&times;</span>
        <h2 className="modal-title">¡Tu Registro!</h2>
        <p>Guarda este código QR como comprobante de tu registro</p>
        <div className="qr-container">
          <QRCodeSVG 
            value={uuid} 
            size={180}
            fgColor="#9E1F1F"
            bgColor="#F5E7D1"
            level="H"
            includeMargin={true}
          />
        </div>
        <p className="modal-uuid">{uuid}</p>
        <div className="modal-footer">
          Presiona ESC o haz clic fuera para cerrar
        </div>
      </div>
    </div>
  );
};

export default QRModal;