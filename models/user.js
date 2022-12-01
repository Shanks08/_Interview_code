const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: 10,
    max: 99,
  },
  email: {
    type: String,
    //  required: true,
    validate() {
      return validator.isEmail(this.email);
    },
  },
  houseNo: {
    type: Number,
  },
  houseName: {
    type: String,
    required: true,
  },
  street: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    //  required: true,
    default: 'West Bengal',
  },
  country: {
    type: String,
    //  required: true,
    default: 'West Bengal',
  },
  username: {
    type: String,
    required: true,
    validate() {
      for (let i = 0; i < this.username.length; i++) {
        if (
          !(
            (this.username.charAt(i) >= 'a' &&
              this.username.charAt(i) <= 'z') ||
            (this.username.charAt(i) >= 'A' && this.username.charAt(i) <= 'Z')
          )
        ) {
          return false;
        }
      }
      return true;
    },
  },
  password: {
    type: String,
    validate() {
      let specialChar = 0;
      let nums = 0;

      if (this.password.length < 10) return false;

      for (let i = 0; i < this.password.length; i++) {
        if (this.password.charAt(i) >= '0' && this.password.charAt(i) <= '9') {
          nums++;
        } else if (
          (this.password.charAt(i) < 'a' || this.password.charAt(i) > 'z') &&
          (this.password.charAt(i) > 'Z' || this.password.charAt(i) < 'A') &&
          (this.password.charAt(i) > '9' || this.password.charAt(i) < '0')
        ) {
          specialChar++;
        }
      }

      return specialChar >= 2 && nums >= 2;
    },
  },
  token: { type: String },
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
