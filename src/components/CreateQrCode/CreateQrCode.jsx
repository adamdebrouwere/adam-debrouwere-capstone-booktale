import QrCode from "qrcode";
import { useEffect } from "react";
import { v4 as uuidv4 } from 'uuid'

function CreateQrCode({ qrCodeUrl, setQrCodeUrl, qrCodeId, setQrCodeId }) {

  const handleQrCodeId = () => {
    const uniqueId = uuidv4();
    setQrCodeId(uniqueId);
  };

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
      generateQrCode(`http://localhost:5173/comments/${qrCodeId}`)
    }
  }, [qrCodeId])

  return (
    <div>
      <button onClick={handleQrCodeId}>
        Generate QR Code
      </button>
      {qrCodeUrl && <img src={qrCodeUrl} alt="Generated QR Code" />}
    </div>
  );
}

export default CreateQrCode;
