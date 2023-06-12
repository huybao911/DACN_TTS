import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, CircularProgress, FormControl, FormLabel, TextField, Typography, } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { updateJob } from "redux/actions/company";
import FormCity from "pages/auth/FormCity_Company";
import FormGT from "pages/auth/FormGT_Company";
import { Container } from "@mui/material";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    btnLogin: {
        marginTop: theme.spacing(1.5),
        marginRight: theme.spacing(1),
        padding: theme.spacing(1, 2),
    },
    formLabel: {
        fontWeight: 600,
        marginBottom: theme.spacing(1.5),
    },
    formControl: {
        margin: theme.spacing(1, 0),
    },
}));

type Props = {
    job: any;
};

interface IInitialValues {
    nameJob: string;
    gt: any;
    city: any;
    quantity: number;
    salary: number;
    jobDescription: string;
    jobRequest: string;
    benefit: string;
    expirationDate: string;
}

const UpdateJob: React.FC<Props> = ({ job }): JSX.Element => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const initialValues: IInitialValues = {
        nameJob: job?.nameJob ?? "",
        gt: job?.gt ?? "",
        city: job?.city ?? "",
        quantity: job?.quantity ?? "",
        salary: job?.salary ?? "",
        jobDescription: job?.jobDescription ?? "",
        jobRequest: job?.jobRequest ?? "",
        benefit: job?.benefit ?? "",
        expirationDate: job?.expirationDate ?? "",
    };


    const onHandleSubmit = (
        values: IInitialValues,
        { setSubmitting }: any
    ): Promise<void> =>
        dispatch<any>(updateJob(values, job._id, setSubmitting));

    const validationSchema = Yup.object({
        nameJob: Yup.string().required("required!"),
        quantity: Yup.string().required("required!"),
        salary: Yup.string().required("required!"),
        jobDescription: Yup.string().required("required!"),
        jobRequest: Yup.string().required("required!"),
        benefit: Yup.string().required("required!"),
        expirationDate: Yup.string().required("required!"),
    });

    return (
        <Container style={{ maxWidth: 600 }}>
            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onHandleSubmit}
            >
                {({ isSubmitting, handleSubmit, values, handleChange, handleBlur, errors, touched, setFieldValue }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Box display={"flex"}
                            flexDirection={'column'}
                            justifyContent={'center'}
                            alignItems={'center'}
                            style={{ backgroundColor: 'white', padding: '30px 0px', borderRadius: '20px' }}>
                            <FormControl className={classes.formControl}>
                                <FormLabel style={{ fontWeight: "bold", fontSize: "14px", margin: "10px 0" }}>
                                    Tên công việc
                                </FormLabel>

                                <TextField
                                    style={{ width: 300 }}
                                    fullWidth
                                    variant={'outlined'}
                                    name='nameJob'
                                    value={values.nameJob}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder='Nhập tên công việc'
                                    inputProps={{
                                        style: {
                                            fontSize: '12px',
                                        }
                                    }}
                                    helperText={touched.nameJob ? errors.nameJob : ""}
                                    error={touched.nameJob ? Boolean(errors.nameJob) : false}
                                />
                            </FormControl>

                            <FormControl className={classes.formControl}>
                                <FormLabel style={{ fontWeight: "bold", fontSize: "14px", margin: "10px 0" }}>
                                    Số lượng người
                                </FormLabel>

                                <TextField
                                    style={{ width: 300 }}
                                    fullWidth
                                    variant={'outlined'}
                                    name='quantity'
                                    value={values.quantity}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder='Nhập số lượng người'
                                    inputProps={{
                                        style: {
                                            fontSize: '12px',
                                        }
                                    }}
                                    helperText={touched.quantity ? errors.quantity : ""}
                                    error={touched.quantity ? Boolean(errors.quantity) : false}
                                />
                            </FormControl>

                            <FormControl className={classes.formControl}>
                                <FormLabel style={{ fontWeight: "bold", fontSize: "14px", margin: "10px 0" }}>
                                    Lương
                                </FormLabel>
                                <TextField
                                    style={{ width: 300 }}
                                    fullWidth
                                    variant="outlined"
                                    name='salary'
                                    value={values.salary}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder='Nhập lương'
                                    helperText={touched.salary ? errors.salary : ""}
                                    error={touched.salary ? Boolean(errors.salary) : false}
                                    inputProps={{
                                        style: {
                                            fontSize: '12px',
                                        }
                                    }}
                                />
                            </FormControl>

                            <FormControl className={classes.formControl}>
                                <FormLabel style={{ fontWeight: "bold", fontSize: "14px", margin: "10px 0" }}>
                                    Mô tả công việc
                                </FormLabel>
                                <ReactQuill theme="snow" value={values.jobDescription} onChange={(e: any) => {
                                    setFieldValue('jobDescription', e);
                                }} />
                            </FormControl>

                            <FormControl className={classes.formControl}>
                                <FormLabel style={{ fontWeight: "bold", fontSize: "14px", margin: "10px 0" }}>
                                    Yêu cầu công việc
                                </FormLabel>
                                <ReactQuill theme="snow" value={values.jobRequest} onChange={(e: any) => {
                                    setFieldValue('jobRequest', e);
                                }} />
                            </FormControl>

                            <FormControl className={classes.formControl}>
                                <FormLabel style={{ fontWeight: "bold", fontSize: "14px", margin: "10px 0" }}>
                                    Quyền lợi công việc
                                </FormLabel>
                                <ReactQuill theme="snow" value={values.benefit} onChange={(e: any) => {
                                    setFieldValue('benefit', e);
                                }} />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <FormLabel style={{ fontWeight: "bold", fontSize: "14px", margin: "10px 0" }}>
                                    Ngày hết hạn
                                </FormLabel>
                                <TextField
                                    style={{ width: 300 }}
                                    fullWidth
                                    variant="outlined"
                                    name='expirationDate'
                                    value={values.expirationDate}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder='Nhập ngày hết hạn'
                                    helperText={touched.expirationDate ? errors.expirationDate : ""}
                                    error={touched.expirationDate ? Boolean(errors.expirationDate) : false}
                                    inputProps={{
                                        style: {
                                            fontSize: '12px',
                                        }
                                    }}
                                />
                            </FormControl>

                            <FormControl className={classes.formControl}>
                                <FormLabel style={{ fontWeight: "bold", fontSize: "14px", marginTop: "5px" }}>Thành phố</FormLabel>
                                <FormCity isCity={true} />
                            </FormControl>
                            <FormGT isGT={true} />
                            <Button
                                style={{ backgroundColor: "black", color: "white" }}
                                type='submit'
                                variant='contained'
                                color='primary'
                                size='small'
                                className={classes.btnLogin}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? <CircularProgress size='1rem' /> : "Cập Nhật Công Việc"}
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Container>
    );
};

export default UpdateJob;
