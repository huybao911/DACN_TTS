import { IAdminState, AdminActions } from "./admin";
import { ICompanyState, CompanyActions } from "./company";
import { IUserState, UserActions } from "./user";
import { IAlertState, AlertActions } from "./alert";

export type AppState = IAdminState | IUserState | ICompanyState | IAlertState;
export type AppActions = AdminActions | UserActions | CompanyActions |  AlertActions;
 