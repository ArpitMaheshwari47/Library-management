const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

const { isValid, isValidbody, emailRegex, isValidPassword, phoneRegex } = require("../middleware/validation");

const registerUser = async (req, res) => {
  try {
    let data = req.body
    const { title, userName, email, password, phone } = data

    // console.log(req.body)

    if (!title || !userName || !email || !password || !phone) {
      return res.status(400).send({ status: false, message: "Please Enter all the Feilds" });

    }
    if (!isValid(title)) {
      return res.status(400).send({ status: false, message: "plz enter your firstName" })
    }


    //******************************************************EMAIL VALIDATION************************************************************ */        
    if (!isValid(email)) {
      return res.status(400).send({ status: false, message: "plz enter the emailId" })

    }
    if (!emailRegex.test(email)) {
      return res.status(400).send({ status: false, message: "enter the valid emailId" })
    }

    let emailCheck = await User.findOne({ email: email })
    if (emailCheck) {
      return res.status(400).send({ status: false, message: "emailId is already in use" })

    }

    //***************************************************************************PHONE VALIDATION********************************************************* */

    if (!isValid(phone)) {
      return res.status(400).send({ status: false, message: "plz enter phone number" })
    }

    if (!phoneRegex.test(phone)) {
      return res.status(400).send({ status: false, message: "plz enter valid phoneNumber" })
    }

    if (!isValidPassword(password)) {
      return res.status(400).send({ status: false, message: "password should be more than 8 characters or less than 15 characters" })
    }
    let phoneCheck = await User.findOne({ phone: phone })
    if (phoneCheck) {
      return res.status(400).send({ status: false, message: "phone number is already in use" })
    }


    const user = await User.create(data);
    if (user) {
      return res.status(201).send({
        _id: user._id,
        title: user.title,
        userName: user.userName,
        email: user.email,
        password: user.password,
        token: generateToken(user._id),
      });
    } else {
      return res.status(400).send({ status: false, message: "User already exists" });
    }
  } catch (err) {
    return res.status(500).send({ status: false, message: err });
  }

};


const authUser = async (req, res) => {
  try {
    let data = req.body
    const { userName, password } = data;

    if (!isValidbody(data)) return res.status(400).send({ status: false, message: "userName and password cannot be empty" })
    if (!isValid(userName)) return res.status(400).send({ status: false, message: "userName should be in string format and it cannot be empty" })
    if (!isValid(password)) return res.status(400).send({ status: false, message: "password should be in string format and it cannot be empty" })
    if (!isValidPassword(password)) return res.status(400).send({ status: false, message: "password should be 8-15 characters in length." })

    const user = await User.findOne({ userName });
    if (user && (await user.matchPassword(password))) {
      return res.send({
        _id: user._id,
        title: user.title,
        userName: user.userName,
        email: user.email,
        phone: user.phone,
        token: generateToken(user._id),
      });
    } else {
      return res.status(401).send({ status: false, message: "Invalid email and password" });
    }

  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }

};

module.exports = { registerUser, authUser };