import axios from "axios";
import { Dispatch } from "redux";
import { setAdminAuthToken } from "utils/headers";
import { setAlert } from "./alert";
import { AdminActions } from "redux/types/admin";
import { AlertActions } from "redux/types/alert";
import types from "./types";

const URI = "https://datn-tts-backend.onrender.com/api/v1/admin";
const USER_URI = "https://datn-tts-backend.onrender.com/api/v1/user";

// LOAD ADMIN
export const loadAdmin = () => async (dispatch: Dispatch<AdminActions>) => {
  if (localStorage.admin__token) setAdminAuthToken(localStorage.admin__token);

  const config: any = {
    header: {
      "Content-Type": "application/json",
    },
  };

  try {
    const { data } = await axios.get(`${URI}/auth-admin`, config);

    dispatch({ type: types.ADMIN_LOADED, payload: data });
  } catch (error) {
    dispatch({ type: types.ADMIN_AUTH_ERROR });
  }
};

// LOGIN ADMIN
export const loginAdmin =
  (body: any, setSubmitting: any) =>
    async (dispatch: Dispatch<AdminActions>) => {
      const config: any = {
        header: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.post(`${URI}/login`, body, config);
        dispatch({
          type: types.ADMIN_LOGIN_SUCCESS,
          payload: data,
        });
        dispatch<any>(
          setAlert({
            msg: "Đăng nhập tài khoản Admin thành công!",
            status: 200,
            alertType: "success",
          })
        );
        dispatch<any>(loadAdmin());
      } catch (error: any) {
        dispatch({ type: types.ADMIN_LOGIN_FAIL });
        dispatch<any>(
          setAlert({
            msg: "Đăng nhập tài khoản Admin thất bại!",
            status: 200,
            alertType: "error",
          })
        );
      } finally {
        setSubmitting(false);
      }
    };

// REGISTER ADMIN
export const registerAdmin =
  (body: any, setSubmitting: any) =>
    async (dispatch: Dispatch<AdminActions | AlertActions>) => {
      const config: any = {
        header: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.post(`${USER_URI}/register`, body, config);
        dispatch({
          type: types.ADMIN_REGISTER_SUCCESS,
          payload: data,
        });
        dispatch<any>(
          setAlert({
            msg: "Đăng ký tài khoản Admin thành công!",
            status: 200,
            alertType: "success",
          })
        );
        // dispatch<any>(loadAdmin());
      } catch (error: any) {
        dispatch({ type: types.ADMIN_REGISTER_FAIL });
        dispatch<any>(
          setAlert({
            msg: "Đăng ký tài khoản Admin thất bại!",
            status: 200,
            alertType: "error",
          })
        );
      } finally {
        setSubmitting(false);
      }
    };

// ADD GT
export const addGT =
  (body: any, setSubmitting: any) =>
    async (dispatch: Dispatch<AdminActions | AlertActions>) => {
      const config: any = {
        header: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.post(`${URI}/addGT`, body, config);
        dispatch({
          type: types.ADMIN_ADDGT_SUCCESS,
          payload: data,
        });
        dispatch<any>(
          setAlert({
            msg: "Thêm giới tính thành công!",
            status: 200,
            alertType: "success",
          })
        );
        // dispatch<any>(loadAdmin());
      } catch (error: any) {
        dispatch({ type: types.ADMIN_ADDGT_FAIL });
        dispatch<any>(
          setAlert({
            msg: "Thêm giới tính thất bại!",
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

// UPDATE GT
export const updateGT =
  (body: any, id: number, setSubmitting: any) =>
    async (dispatch: Dispatch<AdminActions | AlertActions>) => {
      const config: any = {
        header: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.patch(`${URI}/gt/${id}`, body, config);
        dispatch({
          type: types.UPDATE_GT,
          payload: data,
        });
        dispatch<any>(getGTs());
        dispatch<any>(
          setAlert({
            msg: "Cập nhật giới tính thành công!",
            status: 200,
            alertType: "success",
          })
        );
      } catch (error: any) {
        dispatch<any>(
          setAlert({
            msg: "Xảy ra lỗi khi cập nhật giới tính!",
            status: error.response.status,
            alertType: "error",
          })
        );
      } finally {
        setSubmitting(false);
      }
    };

// DELETE GT
export const deleteGT =
  (id: number) => async (dispatch: Dispatch<AdminActions | AlertActions>) => {
    const config: any = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.delete(`${URI}/gt/${id}`, config);
      dispatch({ type: types.DELETE_GT, payload: id });
      dispatch<any>(loadAdmin());
      dispatch<any>(
        setAlert({
          msg: "Xóa giới tính thành công!",
          status: 200,
          alertType: "success",
        })
      );
    } catch (error: any) {
      dispatch<any>(
        setAlert({
          msg: "Xảy ra lỗi khi xóa giới tính!",
          status: error.response.status,
          alertType: "error",
        })
      );
    }
  };

// ADD CITY
export const addCity =
  (body: any, setSubmitting: any) =>
    async (dispatch: Dispatch<AdminActions | AlertActions>) => {
      const config: any = {
        header: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.post(`${URI}/addCity`, body, config);
        dispatch({
          type: types.ADMIN_ADDCITY_SUCCESS,
          payload: data,
        });
        dispatch<any>(
          setAlert({
            msg: "Thêm thành phố thành công!",
            status: 200,
            alertType: "success",
          })
        );
        // dispatch<any>(loadAdmin());
      } catch (error: any) {
        dispatch({ type: types.ADMIN_ADDCITY_FAIL });
        dispatch<any>(
          setAlert({
            msg: "Thêm thành phố thất bại!",
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

// UPDATE CITY
export const updateCity =
  (body: any, id: number, setSubmitting: any) =>
    async (dispatch: Dispatch<AdminActions | AlertActions>) => {
      const config: any = {
        header: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.patch(`${URI}/city/${id}`, body, config);
        dispatch({
          type: types.UPDATE_CITY,
          payload: data,
        });
        dispatch<any>(getGTs());
        dispatch<any>(
          setAlert({
            msg: "Cập nhật thành phố thành công!",
            status: 200,
            alertType: "success",
          })
        );
      } catch (error: any) {
        dispatch<any>(
          setAlert({
            msg: "Xảy ra lỗi khi cập nhật thành phố!",
            status: error.response.status,
            alertType: "error",
          })
        );
      } finally {
        setSubmitting(false);
      }
    };

// DELETE CITY
export const deleteCity =
  (id: number) => async (dispatch: Dispatch<AdminActions | AlertActions>) => {
    const config: any = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.delete(`${URI}/city/${id}`, config);
      dispatch({ type: types.DELETE_CITY, payload: id });
      dispatch<any>(loadAdmin());
      dispatch<any>(
        setAlert({
          msg: "Xóa thành phố thành công!",
          status: 200,
          alertType: "success",
        })
      );
    } catch (error: any) {
      dispatch<any>(
        setAlert({
          msg: "Xảy ra lỗi khi xóa thành phố!",
          status: error.response.status,
          alertType: "error",
        })
      );
    }
  };

// GET USERS
export const getUsers =
  () => async (dispatch: Dispatch<AdminActions | AlertActions>) => {
    const config: any = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.get(`${URI}/users`, config);
      dispatch({ type: types.GET_USERS, payload: data });
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

// GET USER
export const getUser =
  () => async (dispatch: Dispatch<AdminActions | AlertActions>) => {
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
export const getGTs =
  () => async (dispatch: Dispatch<AdminActions | AlertActions>) => {
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

// GET CITY
export const getCity =
  () => async (dispatch: Dispatch<AdminActions | AlertActions>) => {
    const config: any = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.get(`${URI}/citys`, config);
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

// GET JOB
export const getJobEvents =
  () => async (dispatch: Dispatch<AdminActions | AlertActions>) => {
    const config: any = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.get(`${URI}/jobEvents`, config);
      dispatch({ type: types.GET_JOBEVENTS, payload: data });
    } catch (error: any) {
      dispatch<any>(
        setAlert({
          msg: "Xảy ra lỗi khi lấy dữ liệu jobevents!",
          status: error.response.status,
          alertType: "error",
        })
      );
    }
  };
// GET ROLES
export const getRoles =
  () => async (dispatch: Dispatch<AdminActions | AlertActions>) => {
    const config: any = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.get(`${URI}/roles`, config);
      dispatch({ type: types.GET_ROLES, payload: data });
    } catch (error: any) {
      dispatch<any>(
        setAlert({
          msg: "Xảy ra lỗi khi lấy dữ liệu role!",
          status: error.response.status,
          alertType: "error",
        })
      );
    }
  };

// UPDATE USER DATA
export const updateUser =
  (body: any, id: number, setSubmitting: any) =>
    async (dispatch: Dispatch<AdminActions | AlertActions>) => {
      const config: any = {
        header: {
          "Content-Type": "application/json",
        },
      };

      try {
        const { data } = await axios.patch(`${URI}/users/${id}`, body, config);
        dispatch({
          type: types.UPDATE_USER,
          payload: data,
        });
        dispatch<any>(getUsers());
        dispatch<any>(
          setAlert({
            msg: "Cập nhật thành công!",
            status: 200,
            alertType: "success",
          })
        );
      } catch (error: any) {
        dispatch<any>(
          setAlert({
            msg: "Xảy ra lỗi khi cập nhật người dùng!",
            status: error.response.status,
            alertType: "error",
          })
        );
      } finally {
        setSubmitting(false);
      }
    };

// DELETE USER
export const deleteUser =
  (id: number) => async (dispatch: Dispatch<AdminActions | AlertActions>) => {
    const config: any = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      await axios.delete(`${URI}/users/${id}`, config);
      dispatch({ type: types.DELETE_USER, payload: id });
      dispatch<any>(loadAdmin());
      dispatch<any>(
        setAlert({
          msg: "Xóa thành công!",
          status: 200,
          alertType: "success",
        })
      );
    } catch (error: any) {
      dispatch<any>(
        setAlert({
          msg: "Xảy ra lỗi khi xóa người dùng!",
          status: error.response.status,
          alertType: "error",
        })
      );
    }
  };

// LOGOUT ADMIN
export const logOutAdmin =
  () => (dispatch: Dispatch<AdminActions | AlertActions>) => {
    dispatch({ type: types.ADMIN_LOGOUT });
    dispatch<any>(
      setAlert({
        msg: "Đăng xuất thành công!",
        status: 200,
        alertType: "success",
      })
    );
  };
