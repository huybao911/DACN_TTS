import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, CircularProgress, Box } from "@material-ui/core";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { updateGT } from "redux/actions/admin";
import { FormControl, FormLabel, TextField } from "@mui/material";

const useStyles = makeStyles((theme) => ({
    btnLogin: {
        '&.MuiButton-root:hover': {
            backgroundColor: "transparent",
        }
    },
    formLabel: {
        fontWeight: 600,
        marginBottom: theme.spacing(1.5),
    },
    formControl: {
        margin: theme.spacing(2, 0),
    },
}));

type Props = {
    gt: any;
};

interface IInitialValues {
    nameGT: string;
}

const UpdateGT: React.FC<Props> = ({ gt }): JSX.Element => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const initialValues: IInitialValues = {
        nameGT: gt?.nameGT ?? "",
    };


    const onHandleSubmit = (
        values: IInitialValues,
        { setSubmitting }: any
    ): Promise<void> =>
        dispatch<any>(updateGT(values, gt._id, setSubmitting));

    const validationSchema = Yup.object({
        nameGT: Yup.string().required("required!"),
    });

    return (
        <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onHandleSubmit}
        >
            {({ values, handleChange, handleBlur, errors, touched, isSubmitting, handleSubmit }) => (
                <form noValidate onSubmit={handleSubmit}>
                    <Box>
                        <FormControl fullWidth className={classes.formControl}>
                            <FormLabel classes={{ root: classes.formLabel }}>Tên giới tính</FormLabel>
                            <TextField
                                fullWidth
                                name='nameGT'
                                value={values.nameGT}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder='Nhập tên giới tính'
                                helperText={touched.nameGT ? errors.nameGT : ""}
                                error={touched.nameGT ? Boolean(errors.nameGT) : false}
                            />
                        </FormControl>
                        <Button
                            disableRipple
                            style={{ backgroundColor: "black", color: "white" }}
                            type='submit'
                            variant='contained'
                            color='primary'
                            size='small'
                            className={classes.btnLogin}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? <CircularProgress size='1rem' /> : "Cập nhật giới tính"}
                        </Button>
                    </Box>
                </form>
            )}
        </Formik>
    );
};

export default UpdateGT;
