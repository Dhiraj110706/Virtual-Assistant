import jwt from 'jsonwebtoken';

// const isAuth = async (req, res, next) => {
//     try {
//         const token = req.cookies.token || '';
//         if (!token) {
//             return res.status(401).json({ message: 'Unauthorized' });
//         }

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.userId = decoded.id;
//         next();
//     } catch (error) {
//         return res.status(500).json({ message: 'Unauthorized' });
//     }
// };

// export default isAuth;

const isAuth = (req, res, next) => {
  try {
    const token = req.cookies.token || '';
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authenticated'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error("isAuth error:", error.message);
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    });
  }
};

export default isAuth;