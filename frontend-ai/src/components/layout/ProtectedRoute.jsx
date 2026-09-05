// React Hooks
import { useState, useEffect } from "react";

// Navigate -> Redirect user to another page
// useSearchParams -> Read query parameters like ?token=abc
import { Navigate, useSearchParams } from "react-router-dom";

// Zustand store to check/update login state
import { useAuthStore } from "../../store/authStore";

// API function that asks backend "Who is the logged-in user?"
import { getMe } from "../../services/auth.service";

const ProtectedRoute = ({ children }) => {

  // Read authentication status from Zustand.
  // If true → allow access.
  // If false → check backend.
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  // Stores whether authentication checking is still running.
  // Initially true so spinner is shown.
  const [checking, setChecking] = useState(true);

  // Reads query parameters from URL.
  // Example:
  // /dashboard?token=abc123
  const [searchParams, setSearchParams] = useSearchParams();

  // Runs automatically only once when this component loads.
  useEffect(() => {

    // Function that verifies whether user is logged in.
    const verify = async () => {

      // Check whether Google redirected with token.
      // Reads:
      // ?token=abc123
      const tokenFromUrl = searchParams.get("token");

      // ---------- Google Login Flow ----------
      if (tokenFromUrl) {

        // Store token immediately in Zustand.
        // Now frontend knows user is authenticated.
        useAuthStore.setState({
          token: tokenFromUrl,
          isAuthenticated: true,
        });

        // Remove token from URL.
        // /dashboard?token=abc
        // becomes
        // /dashboard
        setSearchParams({});

        try {

          // Ask backend for complete user details.
          // Token only proves login.
          // getMe() returns name, email, id etc.
          const res = await getMe();

          // Save user information in Zustand.
          useAuthStore.setState({
            user: res.data.user,
            isAuthenticated: true,
          });

        } catch {
          // Ignore if request fails.
        }

        // Authentication checking finished.
        // Hide spinner.
        setChecking(false);

        // Stop function here because Google login is complete.
        return;
      }

      // ---------- Normal Login Flow ----------

      // If Zustand already says user is authenticated,
      // don't call backend again.
      if (isAuthenticated) {
        setChecking(false);
        return;
      }

      try {

        // Ask backend whether cookie/session is still valid.
        // Useful after page refresh.
        const res = await getMe();

        // Save latest user information.
        useAuthStore.setState({
          user: res.data.user,
          isAuthenticated: true,
        });

      } catch {

        // User is not logged in.
        // Nothing to update.

      } finally {

        // Whether API succeeds or fails,
        // stop showing loading spinner.
        setChecking(false);
      }
    };

    // Start authentication checking.
    verify();

  }, []); // Empty dependency array → run only once when component loads.




  // While backend is checking authentication,
  // show loading spinner.
  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // If user is still not authenticated,
  // redirect to Login page.
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // User is authenticated.
  // Render the protected page.
  // Example:
  // Dashboard
  // Resume Builder
  // Resume Analyzer
  return children;
};

export default ProtectedRoute;