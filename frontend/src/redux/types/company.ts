import types from "redux/actions/types";
import { IUser } from "./user";
import { IRole } from "./role";
import { IJobEvent } from "./jobEvent";
import { ICity } from "./city";
import { IGT } from "./gt";

export interface ICompany {
  _id: any;
  username: string;
  password: string | null;
  role: any;
  avatar:string;
}

interface ICompanyLoaded {
  type: typeof types.COMPANY_LOADED;
  payload: { getRole: IRole; company: ICompany };
}

interface ICompanyRegisterSuccess {
  type: typeof types.COMPANY_REGISTER_SUCCESS;
  payload: { token: string; company: ICompany };
}

interface ICompanyLoginSuccess {
  type: typeof types.COMPANY_LOGIN_SUCCESS;
  payload: { token: string; company: ICompany };
}

interface IGetUser {
  type: typeof types.GET_USER;
  payload: IUser[];
}

interface IGetGT {
  type: typeof types.GET_GTS;
  payload: IGT[];
}

interface IGetCities {
  type: typeof types.GET_CITIES;
  payload: ICity[];
}

interface IGetProfile {
  type: typeof types.GET_PROFILE;
  payload: ICompany[];
}
interface IUpdateProfile {
  type: typeof types.UPDATE_PROFILE;
  payload: {
    company: ICompany;
    id: number;
  };
}

// interface IGetListCTV {
//   type: typeof types.GET_LIST_CTV;
//   payload: IJobEvent[];
// }

interface IReadCV {
  type: typeof types.READ_CV;
  payload: {
    job: IJobEvent;
    id: number;
  };
}

interface IApproveUserJobApply {
  type: typeof types.APPROVE_USER_APPLY_JOB;
  payload: {
    job: IJobEvent;
    id: number;
  };
}

interface IGetJobs {
  type: typeof types.GET_JOBS;
  payload: IJobEvent[];
}

interface ICreateJobSuccess {
  type: typeof types.CREATE_JOB_SUCCESS;
  payload: IJobEvent[];
}

interface IUpdateJob {
  type: typeof types.UPDATE_JOB;
  payload: {
    job: IJobEvent;
    id: number;
  };
}

interface IDeleteJob {
  type: typeof types.DELETE_JOB;
  payload: number;
}

interface ICreateJobFail {
  type: typeof types.CREATE_JOB_FAIL;
}

interface ICompanyRegisterFail {
  type: typeof types.COMPANY_REGISTER_FAIL;
}

interface ICompanyLoginFail {
  type: typeof types.COMPANY_LOGIN_FAIL;
}

interface ICompanyAuthError {
  type: typeof types.COMPANY_AUTH_ERROR;
}

interface ICompanyLogout {
  type: typeof types.COMPANY_LOGOUT;
}

export type CompanyActions =
  | ICompanyLoaded
  | ICompanyLoginSuccess
  | ICompanyRegisterSuccess
  | ICompanyRegisterFail
  | ICompanyLoginFail
  | ICompanyAuthError
  | ICompanyLogout
  | IGetUser
  | IGetGT
  | IGetCities
  | IGetProfile
  | IUpdateProfile
  | IApproveUserJobApply
  | IReadCV
  | IGetJobs
  | ICreateJobSuccess
  | ICreateJobFail
  | IUpdateJob
  | IDeleteJob;

export type CompanyAdminActions =
  | ICompanyRegisterSuccess
  | ICompanyRegisterFail;

export interface ICompanyState {
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean | null;
  getRole: IRole;
  company: ICompany;
  users: IUser[];
  companys: ICompany[],
  jobs: IJobEvent[];
  cities: ICity[];
  gts: IGT[];
}
