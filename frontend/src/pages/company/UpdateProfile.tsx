import React from "react";
import { Formik } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { updateProfileCompany } from "redux/actions/company";
import { FormControl, TextField, Box, CircularProgress, Avatar, Card, CardHeader, CardContent,Button, Typography, Divider } from "@mui/material";
import {Button as ButtonUpdate} from '@material-ui/core'

import LanguageIcon from '@mui/icons-material/Language';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PlaceIcon from '@mui/icons-material/Place';
import PaymentsIcon from '@mui/icons-material/Payments';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import ApartmentIcon from '@mui/icons-material/Apartment';

import FormCity from "pages/auth/FormCity_Company";
import { TabContext } from "@material-ui/lab";
import { Link } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const useStyles = makeStyles((theme) => ({
    textfield: {
        '& .MuiSelect-select': {
            color: 'black', fontSize: '12px'
        },
        '& .MuiSvgIcon-root': {
            fontSize: '20px', paddingRight: '2px'
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderRadius: '20px'
            },
            '&.Mui-focused fieldset': {
                border: "1px solid black",
            }
        },
        '& label.Mui-focused': {
            color: 'black',
        },
        '& fieldset': {
            borderRadius: '30px'
        },

    },
    hoverDetail: {
        '&: hover': {
            color: 'green',
        },
    },
    cardHeader: {
        borderRadius: '12px',
        justifyContent: 'center',
        background: 'linear-gradient(90deg,#1c4742,#22c96d)',
        maxHeight: '100%',
        width: 1140,
        paddingTop: 30,
        paddingBottom: 30,
        boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px'
    },
    cardBody: {
        borderRadius: '12px',
        maxHeight: '100%',
        width: 1100,
        marginTop: "25px",
    }
}))

type Props = {
    company: any;
};

interface IInitialValues {
    username: string;
    email: string;
    nameCompany: string;
    address: string;
    webAddress: string;
    quantityEmployees: string;
    companyIntro: string;
    city: any;
    avatar: string;

}

const UpdateProfile: React.FC<Props> = ({ company }): JSX.Element => {
    const dispatch = useDispatch();
    const companys = useSelector((state: RootState) => state.company);
    const [value, setValue] = React.useState('1');
    const classes = useStyles();

    const initialValues: IInitialValues = {
        username: company?.username ?? "",
        email: company?.email ?? "",
        nameCompany: company?.nameCompany ?? "",
        address: company?.address ?? "",
        webAddress: company?.webAddress ?? "",
        quantityEmployees: company?.quantityEmployees ?? "",
        companyIntro: company?.companyIntro ?? "",
        city: company?.city ?? "",
        avatar: company?.avatar ?? "",
    };

    const checkAvatar = company.avatar == null ? (
        <Avatar sx={{ width: 170, height: 170 }}>{companys.company.username.charAt(0).toUpperCase()}
        </Avatar>
    ) : (
        <Avatar sx={{ width: 170, height: 170 }} src={company.avatar} />
    )

    // const onHandleSubmit = (
    //     values: IInitialValues,
    //     { setSubmitting }: any
    // ): Promise<void> =>
    //     dispatch<any>(updateProfile(values, user._id, setSubmitting));

    const validationSchema = Yup.object({
        username: Yup.string().required("required!"),
        email: Yup.string().required("required!"),
        nameCompany: Yup.string().required("required!"),
        address: Yup.string().required("required!"),
        webAddress: Yup.string().required("required!"),
        quantityEmployees: Yup.string().required("required!"),
        companyIntro: Yup.string().required("required!"),
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
                formData.append("nameCompany", values.nameCompany);
                formData.append("address", values.address);
                formData.append("webAddress", values.webAddress);
                formData.append("quantityEmployees", values.quantityEmployees);
                formData.append("companyIntro", values.companyIntro);
                formData.append("city", values.city._id);
                formData.append("avatar", values.avatar);
                dispatch(updateProfileCompany(formData, company._id, setSubmitting));
            }}
        >
            {({ isSubmitting, handleSubmit, values, handleChange, handleBlur, setFieldValue, errors, touched }) => (
                <form noValidate onSubmit={handleSubmit}>
                    <Box style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center'
                    }}>
                        <Box style={{ display: "flex", flexDirection: "row" }} >
                            <Box style={{ display: "flex", flexDirection: "row" }}>
                                <Box style={{ paddingLeft: '20px', top: 100, zIndex: 10, }}>
                                    <Box >
                                        <TabContext value={value}>
                                            <Box className={classes.cardHeader}>
                                                <Box display={'flex'} flexDirection={'row'} marginTop={1}>
                                                    <Box style={{
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        width: 170, height: 170,
                                                        overflow: 'hidden',
                                                        borderRadius: '50%',
                                                        margin: "0px 40px",
                                                        display: 'flex'
                                                    }}>
                                                        <Button disableRipple style={{ backgroundColor: 'transparent', boxShadow: "none" }} variant="contained" component="label"
                                                            sx={{
                                                                boxShadow: 'none',
                                                                ':hover': {
                                                                    backgroundColor: 'transparent'
                                                                }
                                                            }}>
                                                            {checkAvatar}
                                                            <input
                                                                accept="image/*"
                                                                name='avatar'
                                                                type='file'
                                                                onChange={(e: any) => {
                                                                    setFieldValue('avatar', e.target.files[0]);
                                                                }}
                                                                onBlur={handleBlur}
                                                                hidden
                                                            />
                                                        </Button>
                                                    </Box>

                                                    <Box sx={{ marginTop: "50px" }}>
                                                        <TextField
                                                            fullWidth
                                                            label="Tên công ty"
                                                            name='nameCompany'
                                                            value={values.nameCompany}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            helperText={touched.nameCompany ? errors.nameCompany : ""}
                                                            error={touched.nameCompany ? Boolean(errors.nameCompany) : false}
                                                            InputLabelProps={{
                                                                style: {
                                                                    fontSize: 18,
                                                                    color: "white",
                                                                }
                                                            }}
                                                            inputProps={{
                                                                style: {
                                                                    fontSize: 20,
                                                                    color: "white",
                                                                    fontWeight: 1000
                                                                }
                                                            }}
                                                            sx={{
                                                                "& .MuiInputBase-root": {
                                                                    "&.Mui-focused fieldset": {
                                                                        borderColor: "white"
                                                                    },
                                                                    "& fieldset": {
                                                                        borderRadius: "10px",
                                                                        borderColor: "white",
                                                                        color: "white"
                                                                    },
                                                                },
                                                                "& label.Mui-focused": {
                                                                    color: "white"
                                                                },
                                                                width: 250,
                                                            }}
                                                        />
                                                        <Box display={'flex'} flexDirection={'row'} sx={{ paddingTop: "20px", color: "white" }}>
                                                            <Box display={'flex'} flexDirection={'row'}>
                                                                <LanguageIcon style={{ width: 25, margin: "15px 10px 0px 0px" }} />
                                                                <Box display={'flex'} flexDirection={'row'}>
                                                                    <FormControl sx={{ textAlign: 'left' }}>
                                                                        <TextField
                                                                            label="Website"
                                                                            name='webAddress'
                                                                            value={values.webAddress}
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            helperText={touched.webAddress ? errors.webAddress : ""}
                                                                            error={touched.webAddress ? Boolean(errors.webAddress) : false}
                                                                            InputLabelProps={{
                                                                                style: {
                                                                                    fontSize: '14px',
                                                                                    color: "white"
                                                                                }
                                                                            }}
                                                                            inputProps={{
                                                                                style: {
                                                                                    fontSize: '14px',
                                                                                    color: "white"
                                                                                }
                                                                            }}
                                                                            sx={{
                                                                                "& .MuiInputBase-root": {
                                                                                    "&.Mui-focused fieldset": {
                                                                                        borderColor: "white"
                                                                                    },
                                                                                    "& fieldset": {
                                                                                        borderRadius: "10px",
                                                                                        borderColor: "white",
                                                                                        color: "white"
                                                                                    },
                                                                                },
                                                                                "& label.Mui-focused": {
                                                                                    color: "white"
                                                                                },
                                                                                width: 250,
                                                                            }}
                                                                        />
                                                                    </FormControl>
                                                                </Box>
                                                            </Box>
                                                            <Box display={'flex'} flexDirection={'row'} sx={{ marginLeft: "20px" }}>
                                                                <LocationCityIcon style={{ width: 25, margin: "15px 10px 0px 0px" }} />
                                                                <FormControl sx={{ textAlign: 'left' }}>
                                                                    <TextField
                                                                        label="Số lượng nhân viên"
                                                                        name='quantityEmployees'
                                                                        value={values.quantityEmployees}
                                                                        onChange={handleChange}
                                                                        onBlur={handleBlur}
                                                                        helperText={touched.quantityEmployees ? errors.quantityEmployees : ""}
                                                                        error={touched.quantityEmployees ? Boolean(errors.quantityEmployees) : false}
                                                                        InputLabelProps={{
                                                                            style: {
                                                                                fontSize: '14px',
                                                                                color: "white"
                                                                            }
                                                                        }}
                                                                        inputProps={{
                                                                            style: {
                                                                                fontSize: '14px',
                                                                                color: "white"
                                                                            }
                                                                        }}
                                                                        sx={{
                                                                            "& .MuiInputBase-root": {
                                                                                "&.Mui-focused fieldset": {
                                                                                    borderColor: "white"
                                                                                },
                                                                                "& fieldset": {
                                                                                    borderRadius: "10px",
                                                                                    borderColor: "white",
                                                                                    color: "white"
                                                                                },
                                                                            },
                                                                            "& label.Mui-focused": {
                                                                                color: "white"
                                                                            },
                                                                            width: 250,
                                                                        }}
                                                                    />
                                                                </FormControl>
                                                            </Box>
                                                        </Box>

                                                    </Box>
                                                </Box>
                                            </Box>
                                            <Box className={classes.cardBody} >
                                                <Box display={'flex'} flexDirection={'row'} >
                                                    <Box display={'flex'} flexDirection={'column'}>
                                                        <Card style={{ width: "750px", borderRadius: "12px" }}>
                                                            <CardHeader style={{ color: "white", fontSize: "14px", background: 'linear-gradient(90deg,#1c4742,#22c96d)' }}
                                                                titleTypographyProps={{ fontSize: '20px', fontWeight: 500 }}
                                                                title="Giới thiệu công ty" />
                                                            <CardContent>
                                                                <ReactQuill theme="snow" value={values.companyIntro} onChange={(e: any) => {
                                                                    setFieldValue('companyIntro', e);
                                                                }} />
                                                            </CardContent>
                                                        </Card>
                                                        <Card style={{ width: "750px", borderRadius: "12px", marginTop: "30px" }}>
                                                            <CardHeader style={{ color: "white", fontSize: "14px", background: 'linear-gradient(90deg,#1c4742,#22c96d)' }}
                                                                titleTypographyProps={{ fontSize: '20px', fontWeight: 500 }}
                                                                title="Tuyển dụng" />
                                                            {company.job.map((job: any) =>
                                                                <Box>
                                                                    <Box display={'flex'} flexDirection={'row'} margin={'30px 30px'}>
                                                                        <Box display={'flex'} flexDirection={'row'} marginTop={1}>
                                                                            <Avatar style={{
                                                                                width: 75,
                                                                                height: 75,
                                                                                marginRight: 5,
                                                                            }}
                                                                                variant="square"
                                                                                src={company.avatar}
                                                                                aria-label="recipe" />

                                                                            <Box sx={{ marginLeft: "5px" }}>
                                                                                <Box fontWeight={1000} fontSize={16} >{job?.nameJob ?? null}</Box>
                                                                                <Box sx={{ fontSize: "14px", paddingTop: "10px" }}  >{company.nameCompany ?? null}</Box>
                                                                                <Box display={'flex'} flexDirection={'row'} sx={{ paddingTop: "10px", marginLeft: "-5px" }} >
                                                                                    <Box display={'flex'} flexDirection={'row'}>
                                                                                        <PlaceIcon sx={{ width: "18px" }}></PlaceIcon>
                                                                                        <Typography style={{ fontSize: '13px', padding: "4px 0px 0px 4px" }}>
                                                                                            {company.city.nameCity ?? null}
                                                                                        </Typography>
                                                                                    </Box>
                                                                                    <Box display={'flex'} flexDirection={'row'} sx={{ margin: "0px 15px" }}>
                                                                                        <PaymentsIcon sx={{ width: "18px" }}></PaymentsIcon>
                                                                                        <Typography style={{ fontSize: '13px', padding: "4px 0px 0px 4px" }}>
                                                                                            {new Intl.NumberFormat('de-DE').format(job.salary)} VNĐ một tháng
                                                                                        </Typography>
                                                                                    </Box>
                                                                                    <Box display={'flex'} flexDirection={'row'}>
                                                                                        <PeopleAltIcon sx={{ width: "18px" }}></PeopleAltIcon>
                                                                                        <Typography style={{ fontSize: '13px', padding: "4px 0px 0px 4px" }}>
                                                                                            {job.quantityRemaining} người
                                                                                        </Typography>
                                                                                    </Box>
                                                                                </Box>
                                                                            </Box>
                                                                        </Box>

                                                                        <Box flexGrow={1} />

                                                                        <Box sx={{ marginTop: "5px" }}>
                                                                            <Box sx={{ fontSize: 14, fontWeight: 500, marginLeft:"100px" }}>
                                                                                Hạn nộp hồ sơ
                                                                            </Box>
                                                                            <Box sx={{ fontSize: 13, marginLeft:"100px" }}>
                                                                                {job?.expirationDate ?? null}
                                                                            </Box>
                                                                            <Box sx={{ marginTop: "23px" }}>
                                                                                <Box component={Link} to={`/listUserApplyJob/${job._id}`}>
                                                                                    <Button style={{
                                                                                        color: "rgb(33, 43, 54)",
                                                                                        height: "25px",
                                                                                        width: "190px",
                                                                                        fontSize: "12px",
                                                                                        borderRadius: "4px",
                                                                                        fontWeight: 500,
                                                                                        textTransform: "capitalize",
                                                                                        border: '1px solid rgb(33, 43, 54)'
                                                                                    }}
                                                                                    >Danh Sách Người Ứng Tuyển</Button>
                                                                                </Box>
                                                                            </Box>
                                                                        </Box>

                                                                    </Box>
                                                                    <Divider />
                                                                </Box>
                                                            )}
                                                        </Card>
                                                    </Box>
                                                    <Box display={'flex'} flexDirection={'column'}>
                                                        <Box>
                                                            <Card style={{ width: "360px", height: "190px", borderRadius: "12px", marginLeft: "30px" }}>
                                                                <CardHeader style={{ color: "white", fontSize: "14px", background: 'linear-gradient(90deg,#1c4742,#22c96d)' }}
                                                                    titleTypographyProps={{ fontSize: '20px', fontWeight: 500 }}
                                                                    title="Thông tin liên hệ" />
                                                                <CardContent>
                                                                    <Box display={'flex'} flexDirection={'column'}>
                                                                        <Box display={'flex'} flexDirection={'row'}>
                                                                            <PlaceIcon style={{ width: "18px" }} />
                                                                            <Box sx={{ padding: "5px 0px 0px 10px", fontSize: "14px", fontWeight: 500 }}>
                                                                                Địa chỉ công ty
                                                                            </Box>
                                                                        </Box>
                                                                        <TextField
                                                                            fullWidth
                                                                            value={values.address}
                                                                            name='address'
                                                                            variant="outlined"
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            helperText={touched.address ? errors.address : ""}
                                                                            error={touched.address ? Boolean(errors.address) : false}
                                                                            inputProps={{
                                                                                style: {
                                                                                    fontSize: '12px',
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
                                                                                marginTop: "10px"
                                                                            }}
                                                                        />
                                                                    </Box>
                                                                </CardContent>
                                                            </Card>
                                                        </Box>
                                                        <Box sx={{ marginTop: "30px" }}>
                                                            <Card style={{ width: "360px", borderRadius: "12px", marginLeft: "30px" }}>
                                                                <CardHeader style={{ color: "white", fontSize: "14px", background: 'linear-gradient(90deg,#1c4742,#22c96d)' }}
                                                                    titleTypographyProps={{ fontSize: '20px', fontWeight: 500 }}
                                                                    title="Thông tin công ty" />
                                                                <CardContent>
                                                                    <Box display={'flex'} flexDirection={'column'}>
                                                                        <Box display={'flex'} flexDirection={'row'}>
                                                                            <AccountCircleIcon style={{ width: "18px" }} />
                                                                            <Box sx={{ padding: "5px 0px 0px 10px", fontSize: "14px", fontWeight: 500 }}>
                                                                                Tên đăng nhập
                                                                            </Box>
                                                                        </Box>
                                                                        <TextField
                                                                            fullWidth
                                                                            value={values.username}
                                                                            name='username'
                                                                            variant="outlined"
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            helperText={touched.username ? errors.username : ""}
                                                                            error={touched.username ? Boolean(errors.username) : false}
                                                                            inputProps={{
                                                                                style: {
                                                                                    fontSize: '12px',
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
                                                                                marginTop: "10px"
                                                                            }}
                                                                        />
                                                                    </Box>
                                                                    <Box display={'flex'} flexDirection={'column'} sx={{ marginTop: "30px" }}>
                                                                        <Box display={'flex'} flexDirection={'row'}>
                                                                            <EmailIcon style={{ width: "18px" }} />
                                                                            <Box sx={{ padding: "5px 0px 0px 10px", fontSize: "14px", fontWeight: 500 }}>
                                                                                Email
                                                                            </Box>
                                                                        </Box>
                                                                        <TextField
                                                                            fullWidth
                                                                            value={values.email}
                                                                            name='email'
                                                                            variant="outlined"
                                                                            onChange={handleChange}
                                                                            onBlur={handleBlur}
                                                                            helperText={touched.email ? errors.email : ""}
                                                                            error={touched.email ? Boolean(errors.email) : false}
                                                                            inputProps={{
                                                                                style: {
                                                                                    fontSize: '12px',
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
                                                                                marginTop: "10px"
                                                                            }}
                                                                        />
                                                                    </Box>
                                                                    <Box display={'flex'} flexDirection={'column'} sx={{ marginTop: "30px" }}>
                                                                        <Box display={'flex'} flexDirection={'row'}>
                                                                            <ApartmentIcon style={{ width: "18px" }} />
                                                                            <Box sx={{ padding: "5px 0px 0px 10px", fontSize: "14px", fontWeight: 500 }}>
                                                                                Thành phố
                                                                            </Box>
                                                                        </Box>
                                                                        <FormCity isCity={true} />
                                                                    </Box>
                                                                    <ButtonUpdate
                                                                        disableRipple
                                                                        type='submit'
                                                                        style={{
                                                                            backgroundColor: 'rgb(33, 43, 54)',
                                                                            color: "white",
                                                                            borderRadius: 6,
                                                                            fontSize: 14,
                                                                            textTransform: 'capitalize',
                                                                            fontWeight: 'normal',
                                                                            display: "flex",
                                                                            margin: "auto"
                                                                        }}
                                                                        variant='contained'
                                                                        disabled={isSubmitting}

                                                                    >
                                                                        {isSubmitting ? <CircularProgress size='1rem' /> : "Cập nhật thông tin"}
                                                                    </ButtonUpdate>
                                                                </CardContent>
                                                            </Card>
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </TabContext>
                                    </Box>
                                </Box>
                            </Box>
                        </Box >
                    </Box>
                </form>
            )
            }
        </Formik >
    );
};

export default UpdateProfile;