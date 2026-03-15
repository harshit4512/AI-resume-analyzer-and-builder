// import { Navigate } from "react-router-dom";
// import { useAuthStore } from "../../store/authStore";

// const ProtectedRoute = ({ children }) => {
//   const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;


import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { getMe } from "../../services/auth.service";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const verify = async () => {
      if (isAuthenticated) {
        setChecking(false);
        return;
      }
      try {
        const res = await getMe();
         console.log("getMe response:", res.data);
        useAuthStore.setState({
          user: res.data.user,
          isAuthenticated: true,
        });
      } catch {
        // not logged in
      } finally {
        setChecking(false);
      }
    };
    verify();
  }, []);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;