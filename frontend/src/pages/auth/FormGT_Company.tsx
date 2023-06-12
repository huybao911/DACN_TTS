import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { useFormikContext } from "formik";
import { MenuItem, FormControl, FormLabel, Select } from "@mui/material";

import { getGT } from "redux/actions/company";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { IGT } from "redux/types/gt";

const useStyles = makeStyles((theme) => ({
    formLabel: {
        fontWeight: 600,
        marginBottom: theme.spacing(1.5),
    },
    formControl: {
        margin: theme.spacing(0, 0),
        width: 302,
    },
    placeholder: {
        color: "#aaa"
    },
    selectStyle: {
        fontSize: '13px',
        marginBottom: '28px',
        marginTop: 10,
        "& fieldset": {
            borderRadius: "10px",
        },
    },
}));

type Props = {
    isGT?: boolean;
};

interface IInitialValues {
    gt: any;
}

// const Placeholder = ({ children }: { children: any }) => {
//     const classes = useStyles();
//     return <div className={classes.placeholder}>{children}</div>;
// };

const FormGT: React.FC<Props> = ({ isGT = false }): JSX.Element => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { values, handleChange, handleBlur, touched, errors } =
        useFormikContext<IInitialValues>();

    const [gts, setGTs] = React.useState<IGT[]>([]);
    const GT = useSelector((state: RootState) => state.company);


    React.useEffect(() => {
        dispatch(getGT());
    }, [dispatch]);

    React.useEffect(() => {
        setGTs(() => GT?.gts?.filter((gt: any) => gt.nameGT));
    }, [GT]);

    return (
        <>

            {isGT ? (
                <FormControl className={classes.formControl}>
                    <FormLabel style={{ fontWeight: "bold", fontSize: "14px", marginTop: "5px" }}>Giới tính</FormLabel>
                    <Select
                        name="gt._id"
                        labelId="demo-simple-select-label"
                        id="handle-gt"
                        value={values.gt._id}
                        className={classes.selectStyle}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.gt ? Boolean(errors.gt) : false}
                        variant={'outlined'}
                        MenuProps={{
                            PaperProps: {
                                style: {
                                    fontSize: 10,
                                },
                            },
                        }}
                    >
                        {gts?.map((gt: any) => (
                            <MenuItem value={gt._id} key={gt._id}>
                                {gt.nameGT}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            ) : null}

        </>
    );
};

export default FormGT;
