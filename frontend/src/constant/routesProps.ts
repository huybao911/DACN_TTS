import React from "react";

type ROUTES = {
  name: string;
  path: string;
  component: React.FC;
  exact?: boolean;
  keyRole?: string;
  auth?: boolean;
};

const routesProps: ROUTES[] = [
  //GUEST
  {
    name: "homePage",
    path: "/",
    component: React.lazy(() => import("pages/guest/Guest")),
    exact: true,
    keyRole: "guest",
    auth: false,
  },
  {
    name: "login",
    path: "/login",
    component: React.lazy(() => import("pages/auth/Login")),
    exact: true,
    keyRole: "guest",
    auth: false,
  },
  {
    name: "loginUser",
    path: "/loginuser",
    component: React.lazy(() => import("pages/auth/LoginUser")),
    exact: true,
    keyRole: "guest",
    auth: false,
  },
  {
    name: "registerCompany",
    path: "/registerCompany",
    component: React.lazy(() => import("pages/auth/RegisterCompany")),
    exact: true,
    keyRole: "guest",
    auth: false,
  },
  {
    name: "registerUser",
    path: "/register",
    component: React.lazy(() => import("pages/auth/RegisterUser")),
    exact: true,
    keyRole: "guest",
    auth: false,
  },
  {
    name: "deatailGuest1",
    path: "/guestEvent1/:id",
    component: React.lazy(() => import("pages/guest/DetailGuest1")),
    exact: true,
    keyRole: "guest",
    auth: false,
  },
  {
    name: "deatailGuest2",
    path: "/guestEvent2/:id",
    component: React.lazy(() => import("pages/guest/DetailGuest2")),
    exact: true,
    keyRole: "guest",
    auth: false,
  },

  //ADMIN
  {
    name: "users",
    path: "/users",
    component: React.lazy(() => import("pages/admin/Users")),
    exact: true,
    keyRole: "admin",
    auth: true,
  },
  {
    name: "gt",
    path: "/gt",
    component: React.lazy(() => import("pages/admin/GT")),
    exact: true,
    keyRole: "admin",
    auth: true,
  },
  {
    name: "addgt",
    path: "/addgt",
    component: React.lazy(() => import("pages/admin/AddGT")),
    exact: true,
    keyRole: "admin",
    auth: true,
  },
  {
    name: "city",
    path: "/city",
    component: React.lazy(() => import("pages/admin/City")),
    exact: true,
    keyRole: "admin",
    auth: true,
  },
  {
    name: "addcity",
    path: "/addcity",
    component: React.lazy(() => import("pages/admin/AddCity")),
    exact: true,
    keyRole: "admin",
    auth: true,
  },
  {
    name: "jobEventAdmin",
    path: "/jobEventAdmin",
    component: React.lazy(() => import("pages/admin/JobEvents")),
    exact: true,
    keyRole: "admin",
    auth: true,
  },

  //COMPANY
  {
    name: "jobCompany",
    path: "/job",
    component: React.lazy(() => import("pages/company/Job")),
    exact: true,
    keyRole: "company",
    auth: true,
  },
  {
    name: "newJob",
    path: "/job/newJob",
    component: React.lazy(() => import("pages/company/NewJob")),
    exact: true,
    keyRole: "company",
    auth: true,
  },
  {
    name: "profileCompany",
    path: "/profileCompany",
    component: React.lazy(() => import("pages/company/Profile")),
    exact: true,
    keyRole: "company",
    auth: true,
  },
  {
    name: "listUserApplyJob",
    path: "/listUserApplyJob/:id",
    component: React.lazy(() => import("pages/company/ListUserApply")),
    exact: true,
    keyRole: "company",
    auth: true,
  },

  //USER
  {
    name: "contentUser",
    path: "/user",
    component: React.lazy(() => import("pages/contents/Content")),
    exact: true,
    keyRole: "user",
    auth: true,
  },
  {
    name: "detailCompany",
    path: "/company/:id",
    component: React.lazy(() => import("pages/contents/DetailCompany")),
    exact: true,
    keyRole: "user",
    auth: true,
  },
  {
    name: "detailContent1",
    path: "/event1/:id",
    component: React.lazy(() => import("pages/contents/DetailContent1")),
    exact: true,
    keyRole: "user",
    auth: true,
  },
  {
    name: "detailContent2",
    path: "/event2/:id",
    component: React.lazy(() => import("pages/contents/DetailContent2")),
    exact: true,
    keyRole: "user",
    auth: true,
  },
  {
    name: "storageEvent",
    path: "/storageEvent",
    component: React.lazy(() => import("pages/User/StorageEvent")),
    exact: true,
    keyRole: "user",
    auth: true,
  },
  {
    name: "DetailStorageEvent",
    path: "/storageEvent/:id",
    component: React.lazy(() => import("pages/User/FeedDetailStorage")),
    exact: true,
    keyRole: "user",
    auth: true,
  },
  {
    name: "applyJob",
    path: "/applyJob",
    component: React.lazy(() => import("pages/User/ApplyJob")),
    exact: true,
    keyRole: "user",
    auth: true,
  },
  {
    name: "profile",
    path: "/profile",
    component: React.lazy(() => import("pages/User/Profile")),
    exact: true,
    keyRole: "user",
    auth: true,
  },
  {
    name: "notfound",
    path: "*",
    component: React.lazy(() => import("pages/not-found/NotFound")),
  },
];

export default routesProps;
