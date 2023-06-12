import types from "redux/actions/types";
import { IRole } from "./role";
import { IJobEvent } from "./jobEvent";
import { ICity } from "./city";

export interface IUser {
  _id: any;
  username: string;
  email: string;
  password: string | null;
  avatar: string;
  role: any;
  date: string;
  birthday: string;
  mssv: string;
  classUser: string;
  phone: string;
  update: string;
  delete: string;
  
  university: string;
  fullName: string;
  nameCompany: string;
  address: string;
  companyIntro: string;
  webAddress: string;
  quantityEmployees: string;
  city:any;
}

interface IUserLoaded {
  type: typeof types.USER_LOADED;
  payload: { getRole: IRole; user: IUser };
}

interface IUserRegisterSuccess {
  type: typeof types.USER_REGISTER_SUCCESS;
  payload: { token: string; user: IUser };
}

interface IUserLoginSuccess {
  type: typeof types.USER_LOGIN_SUCCESS;
  payload: { token: string; user: IUser };
}

interface IUserLoginFail {
  type: typeof types.USER_LOGIN_FAIL;
}

interface IGetCompany {
  type: typeof types.GET_COMPANY;
  payload: IUser[];
}

interface IGetJobs {
  type: typeof types.GET_JOBS;
  payload: IJobEvent[];
}

interface IGetCities {
  type: typeof types.GET_CITIES;
  payload: ICity[];
}

interface IGetEventStorager {
  type: typeof types.GET_STORAGER;
  payload: IJobEvent[];
}

interface ICreateStorager {
  type: typeof types.CREATE_STORAGER;
  payload: {
    job: IJobEvent;
    id: number;
  };
}

interface IDeleteStorager {
  type: typeof types.DELETE_STORAGER;
   payload: {
    job: IJobEvent;
    id: number;
  };
}

interface IUserApplyJob {
  type: typeof types.USER_APPLY_JOB;
  payload: {
    job: IJobEvent;
    id: number;
  };
}

interface IUserUnApplyJob {
  type: typeof types.USER_UNAPPLY_JOB;
   payload: {
    job: IJobEvent;
    id: number;
  };
}

interface IGetJobUserApply {
  type: typeof types.GET_JOB_USER_APPLY;
  payload: IJobEvent[];
}

interface IGetProfile {
  type: typeof types.GET_PROFILE;
  payload: IUser[];
}
interface IUpdateProfile {
  type: typeof types.UPDATE_PROFILE;
  payload: {
    user: IUser;
    id: number;
  };
}

interface IUserRegisterFail {
  type: typeof types.USER_REGISTER_FAIL;
}

interface IUserAuthError {
  type: typeof types.USER_AUTH_ERROR;
}

interface IUserLogout {
  type: typeof types.USER_LOGOUT;
}

export type UserActions =
  | IUserLoaded
  | IUserLoginSuccess
  | IUserLoginFail
  | IUserRegisterSuccess
  | IUserRegisterFail
  | IUserAuthError
  | IGetCompany
  | IGetJobs
  | IGetCities
  | IGetEventStorager
  | ICreateStorager
  | IDeleteStorager
  | IGetJobUserApply
  | IUserApplyJob
  | IUserUnApplyJob
  | IGetProfile
  | IUpdateProfile
  | IUserLogout;

export interface IUserState {
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean | null;
  user: IUser;
  getRole: IRole;
  jobs: IJobEvent[];
  cities: ICity[];
  users: IUser[];
}
