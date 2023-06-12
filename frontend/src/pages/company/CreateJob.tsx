import React from "react";
import { Box, Button, CircularProgress, Container, FormControl, FormLabel, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { createJob } from "redux/actions/company";
import FormCity from "pages/auth/FormCity_Company";
import FormGT from "pages/auth/FormGT_Company";
import { makeStyles } from "@material-ui/core";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    formLabel: {
        fontWeight: 600,
        marginBottom: theme.spacing(1.5),
    },
    formControl: {
        margin: theme.spacing(1, 0),
    },
    placeholder: {
        color: "#aaa"
    },
    selectStyle: {
        fontSize: '13px',
        marginBottom: '28px',
        marginTop: 10,
        width: 300,
        "& fieldset": {
            borderRadius: "10px",
        },
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

const CreateJob: React.FC<Props> = ({ job }): JSX.Element => {
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();

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
        dispatch<any>(createJob(values, setSubmitting));

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
                {({ isSubmitting, handleSubmit, values, handleChange, handleBlur, setFieldValue, errors, touched, }) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Box display={"flex"}
                            flexDirection={'column'}
                            justifyContent={'center'}
                            alignItems={'center'}
                            style={{ backgroundColor: 'white', padding: '30px 0px', borderRadius: '20px' }}>
                            <Typography style={{ fontWeight: "bold", fontSize: "18px", margin: 20 }} >
                                Thêm Công việc
                            </Typography>
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
                                    Số lượng người tuyển
                                </FormLabel>

                                <TextField
                                    style={{ width: 300 }}
                                    fullWidth
                                    variant={'outlined'}
                                    name='quantity'
                                    value={values.quantity}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder='Nhập số lượng người tuyển'
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
                            <FormGT isGT={true} />
                            <FormControl className={classes.formControl}>
                                <FormLabel style={{ fontWeight: "bold", fontSize: "14px", marginTop: "5px" }}>Thành phố</FormLabel>
                                <FormCity isCity={true} />
                            </FormControl>

                            <Box>
                                <Button
                                    type='submit'
                                    style={{
                                        color: "rgb(33, 43, 54)",
                                        height: "34px",
                                        width: "120px",
                                        fontSize: "12px",
                                        borderRadius: "4px",
                                        fontWeight: 500,
                                        textTransform: "capitalize",
                                        border: '1px solid rgb(33, 43, 54)',
                                        marginRight: 10
                                    }}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? <CircularProgress size='1rem' /> : "Tạo Công Việc"}
                                </Button>
                                <Button style={{
                                    color: "#FF6969",
                                    height: "34px",
                                    width: "120px",
                                    fontSize: "12px",
                                    fontWeight: 500,
                                    borderRadius: "4px",
                                    textTransform: "capitalize",
                                    border: '1px solid #FF6969',
                                }}
                                    onClick={history.goBack}
                                >Quay lại</Button>
                            </Box>

                        </Box>

                    </form>
                )}
            </Formik>
        </Container>
    );
};

export default CreateJob;
