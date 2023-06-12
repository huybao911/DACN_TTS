import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useSelector } from "react-redux";

import AppLoader from "layouts/AppLoader";
import { RootState } from "redux/reducers";

type Props = {
  component: React.ComponentType<RouteProps>;
};

const CompanyRoute: React.FC<Props> = ({
  component: Component,
  ...rest
}): JSX.Element => {
  const user = useSelector((state: RootState) => state.user);
  const Company = useSelector((state: RootState) => state.company);
  const admin = useSelector((state: RootState) => state.admin);

  return (
    <Route
      render={(props) => {
        if (Company.loading) {
          return <AppLoader />;
        }
        if (!Company.isAuthenticated) {
          return <Redirect to='/loginuser' />;
        }
        if (user.isAuthenticated && user.getRole.keyRole === "user") {
          return <Redirect to='/user' />;
        }
        if (admin.isAuthenticated && admin.getRole.keyRole === "admin") {
          return <Redirect to='/users' />;
        }
        if (Company.isAuthenticated && Company.getRole.keyRole === "company") {
          return <Component {...props} />;
        }
      }}
      {...rest}
    />
  );
};

export default CompanyRoute;
