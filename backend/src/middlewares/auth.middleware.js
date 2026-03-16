// // import jwt from "jsonwebtoken"
// // import User from "../models/user.model.js"

// // const protect = async (req,res,next)=>{
    
// //       const token = req.cookies.token;

// //       if(!token){
// //         return res.status(401).json({
// //             message:"Not authorized"
// //         });
// //       }

// //       try{
// //         const decoded = jwt.verify(token,process.env.JWT_SECRET)
// //         req.user= await User.findById(decoded.id);
// //         next();
// //       }
      
// //         catch(err){
// //             res.status(401).json({
// //                 message:"Invalid Token"
// //             })
// //         }
      
// // };


// // export default protect;


// import { useState, useEffect } from "react";
// import { Navigate } from "react-router-dom";
// import { useAuthStore } from "../../store/authStore";
// import { getMe } from "../../services/auth.service";

// const ProtectedRoute = ({ children }) => {
//   const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
//   const [checking, setChecking] = useState(true);

//   useEffect(() => {
//     const verify = async () => {
//       if (isAuthenticated) {
//         setChecking(false);
//         return;
//       }
//       try {
//         const res = await getMe();
//         useAuthStore.setState({
//           user: res.data.user,
//           isAuthenticated: true,
//         });
//       } catch {
//         // not logged in
//       } finally {
//         setChecking(false);
//       }
//     };
//     verify();
//   }, []);

//   if (checking) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-white">
//         <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
//       </div>
//     );
//   }

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;


import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protect = async (req, res, next) => {
  // ✅ check cookie first, then Authorization header
  let token = req.cookies.token;

  if (!token && req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

export default protect;