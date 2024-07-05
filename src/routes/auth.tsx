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
  const { authenticated, profile, dataId } = useContext(AppContext);

  if (authenticated != null) {
    if (authenticated) {
      if (profile == "owner") {
        return <RouteComponent />;
      } else {
        return <Navigate to={`/receipts`} />;
      }
    } else {
      localStorage.setItem("destination_url", window.location.pathname);
      return <Navigate to={`/?res=${dataId}`} />;
    }
  }
};

export const TenantRoute: React.FC<Props> = ({
  component: RouteComponent,
}) => {
  const { authenticated, profile, dataId } = useContext(AppContext);
  const isMobile = window.innerWidth <= 768;

  if (authenticated != null) {
    if (authenticated && profile == "tenant") {
      return <RouteComponent />;
    } else if (!authenticated) {
      localStorage.setItem("destination_url", window.location.pathname);
      return <Navigate to={`/?res=${dataId}`} />;
    } else if (authenticated && profile != "tenant") {
      return <Navigate to={isMobile ? "/home" : "/real-estates"} />
    }
  }
}

export const SimpleRoute: React.FC<Props> = ({ component: RouteComponent }) => {
  const { authenticated, user, changeProfile, profile } = useContext(AppContext);
  const isMobile = window.innerWidth <= 768;

  if (authenticated && user) {
    if (user.length > 1 && !profile) {
      return <Navigate to={"/select-profile"} />;
    } else {
      const isOwner = user[0].correntista[0].tipocorrentista == "P";
      user.length == 1 && changeProfile(isOwner ? "owner" : "tenant");
      if (profile == "owner") {
        return <Navigate to={isMobile ? "/home" : "/real-estates"} />;
      } else {
        return <Navigate to={isMobile ? "/home/tenant" : "/receipts"} />;
      }
    }
  }
  return <RouteComponent />;
};