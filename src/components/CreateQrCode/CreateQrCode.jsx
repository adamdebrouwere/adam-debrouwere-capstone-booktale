import "./CreateQrCode.scss";
import QrCode from "qrcode";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthenticationContext } from "../../context/AuthenticationContext";

function CreateQrCode({ qrCodeUrl, setQrCodeUrl, qrCodeId, showQr }) {
  const navigate = useNavigate();
  const { ORIGIN_URL } = useAuthenticationContext();

  useEffect(() => {
    const generateQrCode = async (data) => {
      try {
        const qrCodeImageUrl = await QrCode.toDataURL(data);
        setQrCodeUrl(qrCodeImageUrl);
      } catch (error) {
        console.error("Error generating QR code:", error);
      }
    };

    if (qrCodeId) {
      generateQrCode(`${ORIGIN_URL}/booktale/${qrCodeId}`);
    }
  }, [ORIGIN_URL, qrCodeId, setQrCodeUrl]);

  function handlePrintQrCode() {
    if (qrCodeId) {
      window.print();
    }
  }

  function handleGoToBooktale() {
    if (qrCodeId) {
      navigate(`/booktale/${qrCodeId}`);
    }
  }

  return (
    <div>
      {showQr && (
        <div className="qr-code">
          <p className="qr-code__copy">
            Print out this QR code and paste it in your book to start a
            Booktale!
          </p>
          <div className="qr-code__container">
            <img
              className="qr-code__container-image"
              src={qrCodeUrl}
              alt="Generated QR Code"
            />
            <p className="qr-code__container-title">Booktale</p>
          </div>
          <div className="qr-code__button-container">
            <button className="qr-code__button" onClick={handlePrintQrCode}>
              Print QR Code
            </button>
            <button className="qr-code__button" onClick={handleGoToBooktale}>
              Go to Booktale
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateQrCode;

CreateQrCode.propTypes = {
  qrCodeUrl: PropTypes.string.isRequired,
  setQrCodeUrl: PropTypes.func.isRequired,
  qrCodeId: PropTypes.string.isRequired,
  showQr: PropTypes.bool.isRequired,
};
