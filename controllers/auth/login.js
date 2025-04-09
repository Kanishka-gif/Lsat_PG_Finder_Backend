const User = require('../../models/User.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log("Login request received:", email, password); 
      
  
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: "User not found" });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
  
      const token = jwt.sign({ id: user._id }, 'your_jwt_secret', {
        expiresIn: '7d',
        
      }
    
);
  
      res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: user._id,
          email: user.email,
        }
      });
    } catch (err) {
      console.log("Login error:", err);
      res.status(500).json({ message: "Server Error" });
    }
  };
  

module.exports = { loginUser };
