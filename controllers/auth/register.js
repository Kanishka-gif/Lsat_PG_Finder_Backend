const bcrypt = require("bcrypt");
const User = require("../../models/User.model");
const { registrationValidation } = require("../../services/validation_schema");
const register = async (req, res, next) => {
  try {
    const registerValues = await registrationValidation.validateAsync(req.body);
    console.log(registerValues);
    const { username,phone,country,email, password } = registerValues;

    const userVerification = await User.findOne({                                                                                                                                             
      username,
    });
    const userPhone = await User.findOne({                                                                                                                                             
      phone,
    });
    const userCountry = await User.findOne({                                                                                                                                             
      country,
    });
    const userEmail = await User.findOne({                                                                                                                                             
      email,
    });
    
    const userPassword = await User.findOne({
      password,
    });
    if (userVerification) {
      return res.status(400).json({
        success: false,
        message: "User Exist already",
      });
    }
    if (userPhone) {
      return res.status(400).json({
        success: false,
        message: "User Phone already",
      });
    }
    if (userCountry) {
      return res.status(400).json({
        success: false,
        message: "User country already",
      });
    }
    if (userEmail) {
      return res.status(400).json({
        success: false,
        message: "User Email already",
      });
    }
    if (userPassword) {
      return res.status(400).json({
        success: false,
        message: "User Password exists",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      phone,
      country,
      email,
      password: hashedPassword,
    });
    console.log("new user",newUser)
    await newUser.save();

    res.status(200).json({
      success: true,
      message: "User registered successfully",
      data: registerValues,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = register;



