import types from "redux/actions/types";
import { IUser } from "./user";
import { IGT } from "./gt";
import { ICity } from "./city";
import { IRole } from "./role";
import { IJobEvent } from "./jobEvent";

export interface IAdmin {
  _id: any;
  username: string;
  password: string | null;
  role: any;
}

interface IAdminLoaded {
  type: typeof types.ADMIN_LOADED;
  payload: { getRole: IRole; admin: IAdmin };
}

interface IAdminRegisterSuccess {
  type: typeof types.ADMIN_REGISTER_SUCCESS;
  payload: { token: string; admin: IAdmin };
}

interface IAdminLoginSuccess {
  type: typeof types.ADMIN_LOGIN_SUCCESS;
  payload: { token: string; admin: IAdmin };
}

interface IAdminAddGTSuccess {
  type: typeof types.ADMIN_ADDGT_SUCCESS;
  payload: {
    name: IGT;
    id: number;
  };
}

interface IUpdateGT {
  type: typeof types.UPDATE_GT;
  payload: {
    gt: IGT;
    id: number;
  };
}

interface IDeleteGT {
  type: typeof types.DELETE_GT;
  payload: number;
}

interface IAdminAddCitySuccess {
  type: typeof types.ADMIN_ADDCITY_SUCCESS;
  payload: {
    city: ICity;
    id: number;
  };
}

interface IUpdateCity {
  type: typeof types.UPDATE_CITY;
  payload: {
    city: ICity;
    id: number;
  };
}

interface IDeleteCity {
  type: typeof types.DELETE_CITY;
  payload: number;
}

interface IGetUsers {
  type: typeof types.GET_USERS;
  payload: IUser[];
}

interface IGetUser {
  type: typeof types.GET_USER;
  payload: IUser[];
}

interface IGetGTs {
  type: typeof types.GET_GTS;
  payload: IGT[];
}

interface IGetCities {
  type: typeof types.GET_CITIES;
  payload: ICity[];
}

interface IGetJobEvents {
  type: typeof types.GET_JOBEVENTS;
  payload: IJobEvent[];
}

interface IGetRoles {
  type: typeof types.GET_ROLES;
  payload: IRole[];
}

interface IUpdateUser {
  type: typeof types.UPDATE_USER;
  payload: {
    user: IUser;
    id: number;
  };
}

interface IDeleteUser {
  type: typeof types.DELETE_USER;
  payload: number;
}

interface IAdminAddGTFail {
  type: typeof types.ADMIN_ADDGT_FAIL;
}

interface IAdminAddCityFail {
  type: typeof types.ADMIN_ADDCITY_FAIL;
}

interface IAdminRegisterFail {
  type: typeof types.ADMIN_REGISTER_FAIL;
}

interface IAdminLoginFail {
  type: typeof types.ADMIN_LOGIN_FAIL;
}

interface IAdminAuthError {
  type: typeof types.ADMIN_AUTH_ERROR;
}

interface IAdminLogout {
  type: typeof types.ADMIN_LOGOUT;
}

export type AdminActions =
  | IAdminLoaded
  | IAdminLoginSuccess
  | IAdminRegisterSuccess
  | IAdminRegisterFail
  | IAdminLoginFail
  | IAdminAddGTSuccess
  | IAdminAddGTFail
  | IAdminAddCitySuccess
  | IAdminAddCityFail
  | IAdminAuthError
  | IAdminLogout
  | IGetUsers
  | IGetUser
  | IGetGTs
  | IGetCities
  | IUpdateGT
  | IDeleteGT
  | IUpdateCity
  | IDeleteCity
  | IGetRoles
  | IGetJobEvents
  | IUpdateUser
  | IDeleteUser;

export interface IAdminState {
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean | null;
  admin: IAdmin;
  getRole: IRole;
  users: IUser[];
  roles: IRole[];
  gts: IGT[];
  cities: ICity[];
  jobevents: IJobEvent[];
}
