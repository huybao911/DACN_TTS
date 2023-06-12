import axios from "axios";
import { Dispatch } from "redux";
import { setCompanyAuthToken } from "utils/headers";
import { setAlert } from "./alert";
import { CompanyActions, CompanyAdminActions } from "redux/types/company";
import { AlertActions } from "redux/types/alert";
import types from "./types";

const URI = "https://datn-tts-backend.onrender.com/api/v1/company";
const USER_URI = "https://datn-tts-backend.onrender.com/api/v1/user";

// LOAD COMPANY
export const loadCompany = () => async (dispatch: Dispatch<CompanyActions>) => {
  if (localStorage.company__token)
    setCompanyAuthToken(localStorage.company__token);
  const config: any = {
    header: {
      "Content-Type": "application/json",
    },
  };

  try {
    const { data } = await axios.get(`${URI}/auth-Company`, config);

    dispatch({ type: types.COMPANY_LOADED, payload: data });
  } catch (error) {
    dispatch({ type: types.COMPANY_AUTH_ERROR });
  }
};

// LOGIN COMPANY
export const loginCompany =
  (body: any, setSubmitting: any) =>
    async (dispatch: Dispatch<CompanyActions>) => {
      const config: any = {
        header: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.post(`${URI}/login`, body, config);
        dispatch({
          type: types.COMPANY_LOGIN_SUCCESS,
          payload: data,
        });
        // dispatch<any>(
        //   setAlert({
        //     msg: "Đăng nhập tài khoản công ty thành công!",
        //     status: 200,
        //     alertType: "success",
        //   })
        // );
        dispatch<any>(loadCompany());
      } catch (error: any) {
        dispatch({ type: types.COMPANY_LOGIN_FAIL });
        // dispatch<any>(
        //   setAlert({
        //     msg: "Đăng nhập tài khoản công ty thất bại!",
        //     status: error.response.status,
        //     alertType: "error",
        //   })
        // );
      } finally {
        setSubmitting(false);
      }
    };

// REGISTER COMPANY
export const registerCompany =
  (body: any, setSubmitting: any) =>
    async (dispatch: Dispatch<CompanyActions | AlertActions>) => {
      const config: any = {
        header: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.post(`${USER_URI}/register`, body, config);
        dispatch({
          type: types.COMPANY_REGISTER_SUCCESS,
          payload: data,
        });
        dispatch<any>(
          setAlert({
            msg: "Đăng ký tài khoản công ty thành công!",
            status: 200,
            alertType: "success",
          })
        );
        dispatch<any>(loadCompany());
      } catch (error: any) {
        dispatch({ type: types.COMPANY_REGISTER_FAIL });
        dispatch<any>(
          setAlert({
            msg: "Đăng ký tài khoản công ty thất bại!",
            status: error.response.status,
            alertType: "error",
          })
        );
      } finally {
        setSubmitting(false);
      }
    };

// GET USER
export const getUser =
  () => async (dispatch: Dispatch<CompanyActions | AlertActions>) => {
    const config: any = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.get(`${URI}/user`, config);
      dispatch({ type: types.GET_USER, payload: data });
    } catch (error: any) {
      dispatch<any>(
        setAlert({
          msg: "Xảy ra lỗi khi lấy dữ liệu người dùng!",
          status: error.response.status,
          alertType: "error",
        })
      );
    }
  };


// GET GTS
export const getGT =
  () => async (dispatch: Dispatch<CompanyActions | AlertActions>) => {
    const config: any = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.get(`${URI}/gt`, config);
      dispatch({ type: types.GET_GTS, payload: data });
    } catch (error: any) {
      dispatch<any>(
        setAlert({
          msg: "Xảy ra lỗi khi lấy dữ liệu giới tính!",
          status: error.response.status,
          alertType: "error",
        })
      );
    }
  };

// GET CITIES
export const getCity =
  () => async (dispatch: Dispatch<CompanyActions | AlertActions>) => {
    const config: any = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.get(`${URI}/city`, config);
      dispatch({ type: types.GET_CITIES, payload: data });
    } catch (error: any) {
      dispatch<any>(
        setAlert({
          msg: "Xảy ra lỗi khi lấy dữ liệu thành phố!",
          status: error.response.status,
          alertType: "error",
        })
      );
    }
  };

// GET JOBS
export const getJobs =
  () => async (dispatch: Dispatch<CompanyActions | AlertActions>) => {
    const config: any = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.get(`${URI}/jobs`, config);
      dispatch({ type: types.GET_JOBS, payload: data });
    } catch (error: any) {
      dispatch<any>(
        setAlert({
          msg: "Xảy ra lỗi khi lấy dữ liệu công việc!",
          status: error.response.status,
          alertType: "error",
        })
      );
    }
  };
// CREATE JOB
export const createJob =
  (body: any, setSubmitting: any) =>
    async (dispatch: Dispatch<CompanyActions | AlertActions>) => {
      const config: any = {
        header: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.post(`${URI}/createJob`, body, config);
        dispatch({
          type: types.CREATE_JOB_SUCCESS,
          payload: data,
        });
        dispatch<any>(
          setAlert({
            msg: "Thêm công việc thành công!",
            status: 200,
            alertType: "success",
          })
        );
        dispatch<any>(loadCompany());
      } catch (error: any) {
        dispatch({ type: types.CREATE_JOB_FAIL });
        dispatch<any>(
          setAlert({
            msg: "Thêm công việc thất bại!",
            status: 200,
            // msg: error.response.data,
            // status: error.response.status,
            alertType: "error",
          })
        );
      } finally {
        setSubmitting(false);
      }
    };

// UPDATE JOB
export const updateJob =
  (body: any, id: number, setSubmitting: any) =>
    async (dispatch: Dispatch<CompanyActions | AlertActions>) => {
      const config: any = {
        header: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.put(`${URI}/job/${id}`, body, config);
        dispatch({
          type: types.UPDATE_JOB,
          payload: data,
        });
        dispatch<any>(getJobs());
        dispatch<any>(
          setAlert({
            msg: "Cập nhật công việc thành công!",
            status: 200,
            alertType: "success",
          })
        );
      } catch (error: any) {
        dispatch<any>(
          setAlert({
            msg: "Xảy ra lỗi khi cập nhật công việc!",
            status: error.response.status,
            alertType: "error",
          })
        );
      } finally {
        setSubmitting(false);
      }
    };

// DELETE JOB
export const deleteJob =
  (id: number) => async (dispatch: Dispatch<CompanyActions | AlertActions>) => {
    const config: any = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.delete(`${URI}/job/${id}`, config);
      dispatch({ type: types.DELETE_JOB, payload: id });
      dispatch<any>(loadCompany());
      dispatch<any>(
        setAlert({
          msg: "Xóa công việc thành công!",
          status: 200,
          alertType: "success",
        })
      );
    } catch (error: any) {
      dispatch<any>(
        setAlert({
          msg: "Xảy ra lỗi khi xóa công việc!",
          status: error.response.status,
          alertType: "error",
        })
      );
    }
  };

// GET PROFILE
export const getProfileCompany =
  () => async (dispatch: Dispatch<CompanyActions | AlertActions>) => {
    const config: any = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.get(`${URI}/profile`, config);
      dispatch({ type: types.GET_PROFILE, payload: data });
    } catch (error: any) {
      dispatch<any>(
        setAlert({
          msg: "Xảy ra lỗi khi lấy dữ liệu người dùng!",
          status: error.response.status,
          alertType: "error",
        })
      );
    }
  };

// UPDATE PROFILE
type formdata = FormData;
export const updateProfileCompany =
  (formData: formdata, id: number, setSubmitting: any) =>
    async (dispatch: Dispatch<CompanyActions | AlertActions>) => {
      const config: any = {
        header: {
          "Content-Type": "multipart/form-data",
        },
      };

      try {
        const { data } = await axios.put(`${URI}/profileCompany/${id}`, formData, config);
        dispatch({
          type: types.UPDATE_PROFILE,
          payload: data,
        });
        dispatch<any>(getProfileCompany());
        // dispatch<any>(
        //   setAlert({
        //     msg: "Cập nhật thông tin thành công!",
        //     status: 200,
        //     alertType: "success",
        //   })
        // );
      } catch (error: any) {
        dispatch<any>(
          setAlert({
            msg: "Xảy ra lỗi khi cập nhật thông tin!",
            status: error.response.status,
            alertType: "error",
          })
        );
      } finally {
        setSubmitting(false);
      }
    };

// APPROVE USER APPLY JOB
export const approveUserApplyJob =
  (jobId: number, userApplyId: number) =>
    async (dispatch: Dispatch<CompanyActions | AlertActions>) => {
      const config: any = {
        header: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.put(`${URI}/approveUser/${jobId}/${userApplyId}`, config);
        dispatch({
          type: types.APPROVE_USER_APPLY_JOB,
          payload: data,
        });
        dispatch<any>(getJobs());
        // dispatch<any>(
        //   setAlert({
        //     msg: "Duyệt người dùng thành công!",
        //     status: 200,
        //     alertType: "success",
        //   })
        // );
      } catch (error: any) {
        dispatch<any>(
          setAlert({
            msg: "Duyệt người dùng thất bại!",
            status: error.response.status,
            alertType: "error",
          })
        );
      }
    };

// UNAPPROVE USER APPLY JOB
export const readCV =
  (jobId: number, userApplyId: number) =>
    async (dispatch: Dispatch<CompanyActions | AlertActions>) => {
      const config: any = {
        header: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.put(`${URI}/readCV/${jobId}/${userApplyId}`, config);
        dispatch({
          type: types.READ_CV,
          payload: data,
        });
        dispatch<any>(getJobs());
        // dispatch<any>(
        //   setAlert({
        //     msg: "Không duyệt người dùng thành công!",
        //     status: 200,
        //     alertType: "success",
        //   })
        // );
      } catch (error: any) {
        dispatch<any>(
          setAlert({
            msg: "Xem CV người dùng thất bại!",
            status: error.response.status,
            alertType: "error",
          })
        );
      }
    };    

// LOGOUT COMPANY
export const logOutCompany =
  () => (dispatch: Dispatch<CompanyActions | AlertActions>) => {
    dispatch({ type: types.COMPANY_LOGOUT });
    dispatch<any>(
      setAlert({
        msg: "Đăng xuất thành công!",
        status: 200,
        alertType: "success",
      })
    );
  };
