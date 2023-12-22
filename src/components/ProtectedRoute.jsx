import { useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../services/AuthProvider";

ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

export default function ProtectedRoute({ element }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: location } });
    }
  }, [isAuthenticated, navigate, location]);

  return isAuthenticated ? element : null;
}
