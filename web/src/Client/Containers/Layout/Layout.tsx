import React, { FunctionComponent } from "react";
import { useDispatch } from "react-redux";
import { useRedirect } from "@client/Hooks";
import { PATHS } from "@shared/Constants";
import { logout } from "@shared/Redux/Auth";
import "./Layout.scss";

const Layout: FunctionComponent = ({ children }) => {
  const redirect = useRedirect();
  const dispatch = useDispatch();

  const hanldeRedirect = () => {
    redirect(PATHS.HOMEPAGE);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="Layout">
      <ul>
        <li onClick={handleLogout}> Logout </li>
        <li onClick={hanldeRedirect}> HomePage </li>
      </ul>
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default Layout;
