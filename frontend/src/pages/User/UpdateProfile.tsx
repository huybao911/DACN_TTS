import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { updateProfile } from "redux/actions/user";
import { FormControl, TextField, Box, CircularProgress, Grid, Container, Avatar, Button } from "@mui/material";
import { BoxInfor, GrifInfor, ButtonSubmitInfor } from "layouts/navigation/style";

type Props = {
    user: any;
};

interface IInitialValues {
    username: string;
    email: string;
    fullName: string;
    university: string;
    address: string;
    cv: string;
}

const UpdateProfile: React.FC<Props> = ({ user }): JSX.Element => {
    const dispatch = useDispatch();
    const users = useSelector((state: RootState) => state.user);

    const initialValues: IInitialValues = {
        username: user?.username ?? "",
        email: user?.email ?? "",
        fullName: user?.fullName ?? "",
        university: user?.university ?? "",
        address: user?.address ?? "",
        cv: user?.cv ?? "",
    };

    const checkAvatar = user.avatar == null ? (
        <Avatar sx={{ width: 90, height: 90, }}>{users.user.username.charAt(0).toUpperCase()}
        </Avatar>
    ) : (
        <Avatar sx={{ width: 94, height: 94, }} src={user.avatar} />
    )

    // const onHandleSubmit = (
    //     values: IInitialValues,
    //     { setSubmitting }: any
    // ): Promise<void> =>
    //     dispatch<any>(updateProfile(values, user._id, setSubmitting));

    const validationSchema = Yup.object({
        username: Yup.string().required("required!"),
        email: Yup.string().required("required!"),
    });

    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values: any, { setSubmitting }) => {
                let formData = new FormData();
                formData.append("username", values.username);
                formData.append("email", values.email);
                formData.append("fullName", values.fullName);
                formData.append("university", values.university);
                formData.append("address", values.address);
                formData.append("cv", values.cv);
                dispatch(updateProfile(formData, user._id, setSubmitting));
            }}
        >
            {({ isSubmitting, handleSubmit, values, handleChange, handleBlur, setFieldValue, errors, touched }) => (
                <form noValidate onSubmit={handleSubmit}>
                    <Container sx={{ maxWidth: 1200, fontSize: 14, }}>
                        <Box sx={{ fontSize: '26px', fontWeight: 1000, paddingBottom: 4 }}>Thông tin</Box>

                        <Box display={'flex'} flexDirection={'row'} justifyContent={"center"} textAlign={"center"} >

                            <Grid width={400} sx={{ paddingRight: 6 }}>
                                <BoxInfor >
                                    <Box sx={{ textAlign: "-webkit-center", }}>
                                        <Box style={{
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: 100, height: 100,
                                            border: '1px dashed rgba(145, 158, 171, 0.32)',
                                            overflow: 'hidden',
                                            borderRadius: '50%',
                                            margin: 'auto',
                                            display: 'flex'
                                        }}>
                                            <Avatar sx={{ width: 90, height: 90, }}>{users.user.username.charAt(0).toUpperCase()}
                                            </Avatar>
                                        </Box>

                                    </Box>
                                    <Box style={{ color: "rgb(33, 43, 54)", fontSize: "16px", fontWeight: "700", marginTop: "20px", marginBottom: '4px' }}>{users.user.username}</Box>
                                    <Box sx={{ marginTop: "50px" }} display={'flex'} flexDirection={'column'} justifyContent={"left"} textAlign={"left"}  >
                                        <Box style={{ paddingBottom: '10px' }}>
                                            <Box sx={{ fontWeight: 500, marginBottom: '4px', color: "rgb(33, 43, 54)" }}>Trường đại học </Box>
                                            <Box sx={{ color: 'rgb(99, 115, 129)' }}>
                                                {user.university}
                                            </Box>
                                        </Box>
                                        <Button disableRipple variant="contained" component="label" style={{border:"solid 1px black", backgroundColor:"white", color:"black", boxShadow:"none"}}>
                                            Tải CV từ máy tính
                                           <input
                                            accept="image/*,.pdf"
                                            name='cv'
                                            type='file'
                                            onChange={(e: any) => {
                                                setFieldValue('cv', e.target.files[0]);
                                            }}
                                            onBlur={handleBlur}
                                            hidden
                                        /> 
                                        </Button>
                                    </Box>
                                </BoxInfor>
                            </Grid>
                            <GrifInfor>
                                <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: 'repeat(2, 1fr)', color: "rgb(33, 43, 54)" }} >
                                    <FormControl sx={{ textAlign: 'left', gap: 3, }} >
                                        <TextField
                                            fullWidth
                                            label="Tên đăng nhập"
                                            name='username'
                                            value={values.username}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            helperText={touched.username ? errors.username : ""}
                                            error={touched.username ? Boolean(errors.username) : false}
                                            inputProps={{
                                                style: {
                                                    fontSize: '14px',
                                                },
                                            }}
                                            sx={{
                                                "& .MuiInputBase-root": {
                                                    "&.Mui-focused fieldset": {
                                                        borderColor: "black"
                                                    },
                                                    "& fieldset": {
                                                        borderRadius: "10px",
                                                    },
                                                },
                                                "& label.Mui-focused": {
                                                    color: "black"
                                                },
                                            }}
                                        />
                                    </FormControl>

                                    <FormControl sx={{ textAlign: 'left' }}>
                                        <TextField
                                            fullWidth
                                            label="Email"
                                            name='email'
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder='Nhập nội dung bài viết'
                                            helperText={touched.email ? errors.email : ""}
                                            error={touched.email ? Boolean(errors.email) : false}
                                            inputProps={{
                                                style: {
                                                    fontSize: '14px',
                                                }
                                            }}
                                            sx={{
                                                "& .MuiInputBase-root": {
                                                    "&.Mui-focused fieldset": {
                                                        borderColor: "black"
                                                    },
                                                    "& fieldset": {
                                                        borderRadius: "10px",
                                                    },
                                                },
                                                "& label.Mui-focused": {
                                                    color: "black"
                                                },
                                            }}
                                        />
                                    </FormControl>

                                    <FormControl sx={{ textAlign: 'left' }}>
                                        <TextField
                                            fullWidth
                                            label="Họ và tên"
                                            name='fullName'
                                            value={values.fullName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            helperText={touched.fullName ? errors.fullName : ""}
                                            error={touched.fullName ? Boolean(errors.fullName) : false}
                                            inputProps={{
                                                style: {
                                                    fontSize: '14px',
                                                }
                                            }}
                                            sx={{
                                                "& .MuiInputBase-root": {
                                                    "&.Mui-focused fieldset": {
                                                        borderColor: "black"
                                                    },
                                                    "& fieldset": {
                                                        borderRadius: "10px",
                                                    },
                                                },
                                                "& label.Mui-focused": {
                                                    color: "black"
                                                },
                                            }}
                                        />
                                    </FormControl>

                                    <FormControl sx={{ textAlign: 'left' }}>
                                        <TextField
                                            fullWidth
                                            label="Trường đại học"
                                            value={values.university}
                                            name='university'
                                            variant="outlined"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            helperText={touched.university ? errors.university : ""}
                                            error={touched.university ? Boolean(errors.university) : false}
                                            inputProps={{
                                                style: {
                                                    fontSize: '14px',
                                                }
                                            }}
                                            sx={{
                                                "& .MuiInputBase-root": {
                                                    "&.Mui-focused fieldset": {
                                                        borderColor: "black"
                                                    },
                                                    "& fieldset": {
                                                        borderRadius: "10px",
                                                    },
                                                },
                                                "& label.Mui-focused": {
                                                    color: "black"
                                                },
                                            }}
                                        />
                                    </FormControl>

                                    <FormControl sx={{ textAlign: 'left' }}>
                                        <TextField
                                            fullWidth
                                            label="Địa chỉ"
                                            name='address'
                                            value={values.address}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            helperText={touched.address ? errors.address : ""}
                                            error={touched.address ? Boolean(errors.address) : false}
                                            inputProps={{
                                                style: {
                                                    fontSize: '14px',
                                                }
                                            }}
                                            sx={{
                                                "& .MuiInputBase-root": {
                                                    "&.Mui-focused fieldset": {
                                                        borderColor: "black"
                                                    },
                                                    "& fieldset": {
                                                        borderRadius: "10px",
                                                    },
                                                },
                                                "& label.Mui-focused": {
                                                    color: "black"
                                                },
                                            }}
                                        />
                                    </FormControl>

                                </Box>
                                <ButtonSubmitInfor
                                    disableRipple
                                    type='submit'
                                    style={{
                                        backgroundColor: 'rgb(33, 43, 54)',
                                        color: "white",
                                        borderRadius: 6,
                                        fontSize: 14,
                                        textTransform: 'capitalize',
                                        fontWeight: 'normal',
                                        marginTop: 20
                                    }}
                                    variant='contained'
                                    disabled={isSubmitting}

                                >
                                    {isSubmitting ? <CircularProgress size='1rem' /> : "Cập nhật thông tin"}
                                </ButtonSubmitInfor>
                            </GrifInfor>
                        </Box>
                    </Container>
                </form>
            )}
        </Formik>
    );
};

export default UpdateProfile;