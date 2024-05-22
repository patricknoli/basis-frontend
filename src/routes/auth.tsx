import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import { Navigate } from "react-router-dom";

interface Props {
  component: React.ComponentType;
  path?: string;
}

export const PrivateRoute: React.FC<Props> = ({
  component: RouteComponent,
}) => {
  const { authenticated } = useContext(AppContext);

  if (authenticated != null) {
    if (authenticated) {
      return <RouteComponent />;
    } else {
      localStorage.setItem("destination_url", window.location.pathname);
      return <Navigate to="/" />;
    }
  }
};

export const SimpleRoute: React.FC<Props> = ({ component: RouteComponent }) => {
  const { authenticated } = useContext(AppContext);
  const isMobile = window.innerWidth <= 768;

  if (authenticated) {
    return <Navigate to={isMobile ? "/home" : "/real-estates"} />;
  }
  return <RouteComponent />;
};