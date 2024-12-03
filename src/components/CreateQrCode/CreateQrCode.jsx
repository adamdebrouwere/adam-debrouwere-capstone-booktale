import "./CreateQrCode.scss";
import QrCode from "qrcode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../AuthenticationContext/AuthenticationContext";


function CreateQrCode({ qrCodeUrl, setQrCodeUrl, qrCodeId, showQr }) {
  const navigate = useNavigate();
  const { ORIGIN_URL } = useAuthentication();

  const generateQrCode = async (data) => {
    try {
      const qrCodeImageUrl = await QrCode.toDataURL(data);
      setQrCodeUrl(qrCodeImageUrl);
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  useEffect(() => {
    if (qrCodeId) {
      generateQrCode(`${ORIGIN_URL}/comments/${qrCodeId}`);
    }
  }, [qrCodeId]);

  function handlePrintQrCode() {
    if (qrCodeId) {
      window.print();
    }
  }

  function handleGoToBooktale() {
    if (qrCodeId) {
      navigate(`/booktale/${qrCodeId}`)
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
          <img
            className="qr-code__image"
            src={qrCodeUrl}
            alt="Generated QR Code"
          />
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
