const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  id: Number,
  name: String,
  subtitle: String,
  category: String,
  date: String,
  department: String,
  description: String,
  facultyCoordinator: String,
  organizer: String,
  image: String,
  poster: String,
  registrationLink: String,
  rules: [String],
  startingtime: String,
  studentCoordinators: [
    {
      name: String,
      contact: String
    }
  ],
  tags: [String],
  venue: String
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  college: String,
  department: String,
  city: String,
  year: String,
  accommodation:String,
  selectedDay: String,
});

const transactionSchema = new mongoose.Schema({
  amount:Number,
  paymentStatus: Boolean,
  transactionId: { type: String, unique: true }, 
  image:String
});

const userDataSchema = new mongoose.Schema({
  userData: userSchema,
  selectedEvents: [eventSchema],
  payment: transactionSchema,
  verified: { type: Boolean,default:false },
  qrCode:String,
  registeredOn: { type: Date, default: Date.now }
});

const UserData = mongoose.model('userdata', userDataSchema);

module.exports = UserData;
