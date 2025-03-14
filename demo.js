const QRCode = require("qrcode");

async function convert(data) {
  try {
    const qrData = await QRCode.toDataURL(data);
    console.log(qrData); 
  } catch (err) {
    console.error("Error generating QR code:", err);
  }
}

convert("jaiprasathraj02@gmail.com");
