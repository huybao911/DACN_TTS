import types from "redux/actions/types";
import { IUser } from "redux/types/user";
import { ICompany } from "redux/types/company";
import { ICompanyState, CompanyActions } from "../types/company";
import { IRole } from "redux/types/role";
import { IJobEvent } from "redux/types/jobEvent";
import { ICity } from "redux/types/city";
import { IGT } from "redux/types/gt";

const initialState: ICompanyState = {
  token: localStorage.getItem("company__token"),
  loading: true,
  isAuthenticated: null,
  company: {} as ICompany,
  users: [] as IUser[],
  companys: [] as ICompany[],
  jobs: [] as IJobEvent[],
  cities: [] as ICity[],
  gts: [] as IGT[],
  getRole: {} as IRole,
};

const CompanyReducer = (
  state = initialState,
  action: CompanyActions
): ICompanyState => {
  switch (action.type) {
    case types.COMPANY_LOADED:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };

    case types.COMPANY_LOGIN_SUCCESS:
      localStorage.setItem("company__token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case types.COMPANY_REGISTER_SUCCESS:
      localStorage.setItem("company__token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };

    case types.GET_USER:
      return {
        ...state,
        users: action.payload,
      };

    case types.GET_GTS:
      return {
        ...state,
        gts: action.payload,
      };

    case types.GET_CITIES:
      return {
        ...state,
        cities: action.payload,
      };

    case types.GET_PROFILE:
      return {
        ...state,
        companys: action.payload,
      };

    case types.UPDATE_PROFILE:
      return {
        ...state,
        companys: state.companys.map((company) =>
          company._id === action.payload.id ? { ...action.payload.company } : company
        ),
      };

    // case types.GET_LIST_CTV:
    //   return {
    //     ...state,
    //     events: action.payload,
    //   };

    case types.APPROVE_USER_APPLY_JOB:
      return {
        ...state,
        jobs: state.jobs.map((job) =>
          job._id === action.payload.id ? { ...action.payload.job } : job
        ),
      };
    case types.READ_CV:
      return {
        ...state,
        jobs: state.jobs.map((job) =>
          job._id === action.payload.id ? { ...action.payload.job } : job
        ),
      };

    case types.GET_JOBS:
      return {
        ...state,
        jobs: action.payload,
      };

    case types.CREATE_JOB_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };

    case types.UPDATE_JOB:
      return {
        ...state,
        jobs: state.jobs.map((job) =>
          job._id === action.payload.id ? { ...action.payload.job } : job
        ),
      };

    case types.DELETE_JOB:
      return {
        ...state,
        jobs: state.jobs.filter((job) => job._id !== action.payload),
      };


    case types.COMPANY_LOGIN_FAIL:
    case types.COMPANY_REGISTER_FAIL:
    case types.COMPANY_AUTH_ERROR:
    case types.COMPANY_LOGOUT:
      localStorage.removeItem("company__token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        company: {} as ICompany,
        users: [],
      };

    default:
      return state;
  }
};

export default CompanyReducer;
