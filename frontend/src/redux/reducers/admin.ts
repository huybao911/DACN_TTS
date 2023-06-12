import types from "redux/actions/types";
import { IAdmin } from "redux/types/admin";
import { IUser } from "redux/types/user";
import { IGT } from "redux/types/gt";
import { ICity } from "redux/types/city";
import { IRole } from "redux/types/role";
import { IJobEvent } from "redux/types/jobEvent";
import { IAdminState, AdminActions } from "../types/admin";

const initialState: IAdminState = {
  token: localStorage.getItem("admin__token"),
  loading: false,
  isAuthenticated: null,
  admin: {} as IAdmin,
  getRole: {} as IRole,
  gts: [] as IGT[],
  cities: [] as ICity[],
  roles: [] as IRole[],
  jobevents: [] as IJobEvent[],
  users: [] as IUser[],
};

const adminReducer = (
  state = initialState,
  action: AdminActions
): IAdminState => {
  switch (action.type) {
    case types.ADMIN_LOADED:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };

    case types.ADMIN_ADDGT_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case types.UPDATE_GT:
      return {
        ...state,
        gts: state.gts.map((gt) =>
          gt._id === action.payload.id ? { ...action.payload.gt } : gt
        ),
      };

    case types.DELETE_GT:
      return {
        ...state,
        gts: state.gts.filter((gt) => gt._id !== action.payload),
      };

    case types.ADMIN_ADDCITY_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case types.UPDATE_CITY:
      return {
        ...state,
        cities: state.cities.map((city) =>
          city._id === action.payload.id ? { ...action.payload.city } : city
        ),
      };

    case types.DELETE_CITY:
      return {
        ...state,
        cities: state.cities.filter((city) => city._id !== action.payload),
      };

    case types.UPDATE_USER:
      return {
        ...state,
        users: state.users.map((user) =>
          user._id === action.payload.id ? { ...action.payload.user } : user
        ),
      };
    case types.ADMIN_LOGIN_SUCCESS:
      localStorage.setItem("admin__token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case types.GET_USERS:
      return {
        ...state,
        users: action.payload,
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

    case types.GET_JOBEVENTS:
      return {
        ...state,
        jobevents: action.payload,
      };

    case types.GET_ROLES:
      return {
        ...state,
        roles: action.payload,
      };

    case types.DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload),
      };

    case types.ADMIN_ADDGT_FAIL:
    case types.ADMIN_ADDCITY_FAIL:
    case types.ADMIN_LOGIN_FAIL:
    case types.ADMIN_REGISTER_FAIL:
    case types.ADMIN_AUTH_ERROR:
    case types.ADMIN_LOGOUT:
      localStorage.removeItem("admin__token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        admin: {} as IAdmin,
        users: [],
      };

    default:
      return state;
  }
};

export default adminReducer;
