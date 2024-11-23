import QrCode from "qrcode";
import { useState } from "react";

function QrCodeGenerator() {
  const [qrCode, setQrCode] = useState("");

  const generateQrCode = async (data) => {
    try {
      const qrCodeImageUrl = await QrCode.toDataURL(data);
      console.log(qrCodeImageUrl);
      setQrCode(qrCodeImageUrl);
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };
  return (
    <div>
      <button onClick={() => generateQrCode('https://example.com')}>
        Generate QR Code
      </button>
      {qrCode && <img src={qrCode} alt="Generated QR Code" />}
    </div>
  );
}

export default QrCodeGenerator;
