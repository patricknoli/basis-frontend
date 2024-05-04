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
      return <Navigate to="/login" />;
    }
  }
};