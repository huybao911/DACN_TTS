import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useSelector } from "react-redux";

// import AppLoader from "layouts/AppLoader";
import { RootState } from "redux/reducers";

type Props = {
  component: React.ComponentType<RouteProps>;
};

const GuestRoute: React.FC<Props> = ({
  component: Component,
  ...rest
}): JSX.Element => {
  const user = useSelector((state: RootState) => state.user);
  const Company = useSelector((state: RootState) => state.company);
  const admin = useSelector((state: RootState) => state.admin);


  return (
    <Route
      render={(props) => {
          if (user.isAuthenticated && user.getRole.keyRole === "user") {
          return <Redirect to='/user'/>;
        } else if (Company.isAuthenticated && Company.getRole.keyRole === "company") {
          return <Redirect to='/job' />;
        } else if (admin.isAuthenticated && admin.getRole.keyRole === "admin") {
          return <Redirect to='/users' />;
        } else {
          return <Component {...props} />;
        }
      }}
      {...rest}
    />
  );
};

export default GuestRoute;
