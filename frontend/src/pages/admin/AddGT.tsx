import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, CircularProgress } from "@material-ui/core";
import { Formik } from "formik";
import * as Yup from "yup";
import { IGT } from "redux/types/gt";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/reducers";

import { addGT, getGTs } from "redux/actions/admin";

import { Box, Container, FormControl, FormLabel, TextField, Typography } from "@mui/material";

import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    minHeight: "100vh",
  },
  btnRegister: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1, 2),
  },
  checkboxWrapper: {
    display: "flex",
    justifyContent: "flex-start",
    marginTop: theme.spacing(2),
  },
  textField: {
    margin: theme.spacing(1.5, 0),
    textAlign: 'left',
    fontSize: '13px',
    "& .MuiInputBase-root": {
      "& fieldset": {
        borderRadius: "10px",
      },
    },
  },
}));

interface IInitialValues {
  nameGT: string;
}

const AddGT: React.FC = (): JSX.Element => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const ADMIN = "640cbf0573094a5e2e001859";

  const [gts, setGTs] = React.useState<IGT[]>([]);
  const GT = useSelector((state: RootState) => state.admin);

  const initialValues: IInitialValues = {
    nameGT: "",
  };

  const onHandleSubmit = (values: IInitialValues, { setSubmitting }: any) => {
    dispatch(addGT({ ...values, role: ADMIN }, setSubmitting))
  };

  const validationSchema = Yup.object({
    nameGT: Yup.string().required("Invalid nameGT!"),
  });

  React.useEffect(() => {
    dispatch(getGTs());
  }, [dispatch]);

  React.useEffect(() => {
    setGTs(() => GT?.gts?.filter((gt: any) => gt.nameGT));
  }, [GT]);

  return (
    <Container style={{ maxWidth: 600 }}>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onHandleSubmit}
      >
        {({ isSubmitting, handleSubmit, values, handleChange, handleBlur, errors, touched }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Box display={"flex"}
              flexDirection={'column'}
              justifyContent={'center'}
              alignItems={'center'}
              style={{ backgroundColor: 'white', padding: '40px 0px', borderRadius: '20px' }}>

              <Typography style={{ fontWeight: "bold", fontSize: "18px", margin: 20 }} >
                Thêm giới tính
              </Typography>

              <FormControl style={{ marginTop: 2 }} >
                <FormLabel style={{ fontWeight: "bold", fontSize: "14px", marginTop: 2 }}>
                  Tên giới tính
                </FormLabel>
                <TextField
                  style={{ width: 300, }}
                  className={classes.textField}
                  fullWidth
                  variant={'outlined'}
                  name='nameGT'
                  value={values.nameGT}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder='Nhập tên giới tính muốn thêm'
                  inputProps={{
                    style: {
                      fontSize: '12px',
                    }
                  }}
                  helperText={touched.nameGT ? errors.nameGT : ""}
                  error={touched.nameGT ? Boolean(errors.nameGT) : false} />

              </FormControl>
              <Box marginTop={2}>
                <Button
                  type='submit'
                  disabled={isSubmitting}
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
                >
                  {isSubmitting ? <CircularProgress size='1rem' /> : "Thêm Giới Tính"}
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





    </Container >

  );
};

export default AddGT;
