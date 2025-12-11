import bcrypt from 'bcryptjs'
import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
// import e from 'express'

const genToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d"
  });
};


const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body

    const existEmail = await User.findOne({ email })

    if (existEmail) {
      return res.status(400).json({ message: 'Email already exists' })
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: 'Password must be at least 6 characters long' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    })
    const token = await genToken(user._id)
    res.cookie('token', token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      secure: true,
      sameSite: 'None',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })

    res.status(201).json({
  success: true,
  message: 'User registered successfully',
  user: {
    _id: user._id,
    name: user.name,
    email: user.email,
    assistantName: user.assistantName || "",
    assistantImage: user.assistantImage || ""
  },
  token
});

  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Signup error', error: error.message , success:false})
  }
}

const logIn = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }

    const token = await genToken(user._id)
    res.cookie('token', token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      secure: true,
      sameSite: 'None',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })

    res.status(200).json({
  success: true,
  message: 'User logged in successfully',
  user: { 
    _id: user._id,
    name: user.name,
    email: user.email,
    assistantName: user.assistantName,      // ✅ yeh add
    assistantImage: user.assistantImage     // ✅ yeh add
  },
  token
});


  } catch (error) {
    return res
      .status(400)
      .json({ message: 'Invalid  Email or Password', error: error.message , success:false })
  }
}

const logOut = async (req, res) => {
  try {
    res.clearCookie('token', {
  httpOnly: true,
  secure: true,
  sameSite: 'None'
});

    return res
    .status(200).json({ success:true , message: 'User logged out successfully' })
    }
    catch (error) {
        return res.status(500).json({ message: 'LogOut error', error: error.message , success:false })
    }
}


export { signUp, logIn, logOut }
