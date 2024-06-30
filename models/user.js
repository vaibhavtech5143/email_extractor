const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const userSchema = new Schema({
  name: String,
  google: {
    provider: String,
    accessToken: String,
    refreshToken: String,
    expiryDate: Date, // Keep expiryDate as Date type
  },
  outlook: {
    provider: String,
    accessToken: String,
    refreshToken: String,
    expiryDate: Date, // Keep expiryDate as Date type
  },
  emails: {
    gmail: [{ type: Schema.Types.ObjectId, ref: 'Email' }],
    outlook: [{ type: Schema.Types.ObjectId, ref: 'Email' }],
  },
});

module.exports = mongoose.model('User', userSchema);
