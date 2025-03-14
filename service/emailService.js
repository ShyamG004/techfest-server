const nodemailer = require("nodemailer");
const fs = require("fs");
const QRCode = require("qrcode");
const path = require("path");
require("dotenv").config();

const sendEventBookConfirmationEmail = async (userData, selectedEvents, transactionId, paymentStatus) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
    }
  });

  // Use a writable directory for temporary files in Vercel
  const qrDir = "/tmp/temp_qr";
  if (!fs.existsSync(qrDir)) {
    fs.mkdirSync(qrDir, { recursive: true });
  }

  const qrCodePath = `${qrDir}/${userData.email}_qrcode.png`;
  await QRCode.toFile(qrCodePath, userData.email);

  const eventList = selectedEvents?.map((event) => `<li><b>${event.name}</b> - ${event.date} at ${event.venue}</li>`).join("");

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userData.email,
    subject: "Event Booking Confirmation",
    html: `<h2>Event Booking Confirmation</h2>
      <p>Dear <b>${userData.name}</b>,</p>
      <h3>📅 Registered Events:</h3>
      <ul>${eventList}</ul>
      <h3>📌 Your QR Code:</h3>
      <p>The QR Code is attached to this email. Please show it at the event venue for verification. <strong>Entry without a college ID will not be allowed.</strong></p>
       <h3>📌 Whatsapp Invitation Link</h3>
      <p><strong>Link to join Whatsapp group</strong></p>
      <p> Day - 1 :  https://chat.whatsapp.com/Cw57LfhIhwMD5G50WEBUlt </p>
      <p> Day - 2 :  https://chat.whatsapp.com/F2kVUITzoftIc3cK2YaSV0 </p>
      <p>Best Regards,<br/>NEC TechFest Team</p>`,
    attachments: [{ filename: "QR_Code.png", path: qrCodePath, cid: "qrcode" }]
  };

  try {
    await transporter.sendMail(mailOptions);
    if (fs.existsSync(qrCodePath)) {
      fs.unlinkSync(qrCodePath);
    }
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = { sendEventBookConfirmationEmail };
