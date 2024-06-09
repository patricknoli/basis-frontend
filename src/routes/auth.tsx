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
  const { authenticated, profile } = useContext(AppContext);

  if (authenticated != null) {
    if (authenticated) {
      if (profile == "owner") {
        return <RouteComponent />;
      } else {
        return <Navigate to="/" />;
      }
    } else {
      localStorage.setItem("destination_url", window.location.pathname);
      return <Navigate to="/" />;
    }
  }
};

export const TenantRoute: React.FC<Props> = ({
  component: RouteComponent,
}) => {
  const { authenticated, profile } = useContext(AppContext);
  const isMobile = window.innerWidth <= 768;

  if (authenticated != null) {
    if (authenticated && profile == "tenant") {
      return <RouteComponent />;
    } else if (!authenticated) {
      localStorage.setItem("destination_url", window.location.pathname);
      return <Navigate to="/" />;
    } else if (authenticated && profile != "tenant") {
      return <Navigate to={isMobile ? "/home" : "/real-estates"} />
    }
  }
}

export const SimpleRoute: React.FC<Props> = ({ component: RouteComponent }) => {
  const { authenticated, user, changeProfile } = useContext(AppContext);
  const isMobile = window.innerWidth <= 768;

  if (authenticated && user) {
    if (user.length > 1) {
      return <Navigate to={"/select-profile"} />;
    } else {
      const isOwner = user[0].correntista[0].tipocorrentista == "P"
      changeProfile(isOwner ? "owner" : "tenant");
      if (isOwner) {
        return <Navigate to={isMobile ? "/home" : "/real-estates"} />;
      } else {
        return <Navigate to={isMobile ? "/" : "/"} />;
      }
    }
  }
  return <RouteComponent />;
};