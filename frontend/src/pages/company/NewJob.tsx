import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "redux/actions/company";
import { RootState } from "redux/reducers";
import { ICompany } from "redux/types/company";
import { Box } from "@mui/material";
import CreateJob from "./CreateJob";
const NewJob: React.FC = (): JSX.Element => {

    const dispatch = useDispatch();

    const [Companys, setCompanys] = React.useState<ICompany[]>([]);
    const company = useSelector((state: RootState) => state.company);

    React.useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    React.useEffect(() => {
        setCompanys(() =>
            company?.users?.filter((user: any) =>
                user.role.keyRole === "company"
            ));
    }, [company]);

    React.useEffect(() => {
        document.title = "Công việc | TTS";
    }, []);

    return (

        <>
            {Companys.map((job: any) =>
                <Box key={job._id} >
                    <CreateJob job={job} />
                </Box>
            )}
        </>
    );
};

export default NewJob;
