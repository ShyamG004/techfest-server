const UserData = require("../model/userData");
const QRCode = require("qrcode");
const { sendEventBookConfirmationEmail } = require("../service/emailService");

const register = async (req, res) => {
    const { userData,selectedEvents, transactionId, image, paymentStatus,amount } = req.body;
    try {
        const existingUser = await UserData.findOne({ "userData.email": userData.email });
        if (existingUser) return res.status(400).json({ message: "User already registered" });

        const existingTransactionId = await UserData.findOne({ "payment.transactionId": transactionId });
        if (existingTransactionId) return res.status(400).json({ message: "TransactionId Already Exists , Please Recheck your TransactionId" });

        const qrData = userData.email;
        const qrCodeUrl = await QRCode.toDataURL(qrData);

        const newUser = await UserData.create({
            userData,
            selectedEvents,
            payment: { transactionId, image, paymentStatus ,amount},
            qrCode: qrCodeUrl
        });

        await sendEventBookConfirmationEmail(userData, selectedEvents, transactionId, paymentStatus);

        res.status(201).json({ message: "Registration Successful", qrCode: qrCodeUrl });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { register };
