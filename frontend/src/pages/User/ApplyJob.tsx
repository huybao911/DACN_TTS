import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApplyJob } from "redux/actions/user";
import { RootState } from "redux/reducers";
import FeedApplyJob from "pages/User/FeedApplyJob";
import { Typography, Container } from '@mui/material';
import { IJobEvent } from "redux/types/jobEvent";

const ApplyJob: React.FC = (): JSX.Element => {

    const dispatch = useDispatch();

    const [jobs, setJobs] = React.useState<IJobEvent[]>([]);
    const user = useSelector((state: RootState) => state.user);

    React.useEffect(() => {
        dispatch(getApplyJob());
    }, [dispatch]);

    React.useEffect(() => {
        setJobs(() =>
            user?.jobs?.filter((job: any) =>
                job.nameJob
            ));
    }, [user]);

    React.useEffect(() => {
        document.title = "Công việc đã ứng tuyển";
    }, []);

    return (

        <Container>
            <Typography style={{ fontSize: "30px", fontWeight: "bold", margin: "20px 0px 10px 15px" }}>Công Việc Đã Ứng Tuyển</Typography>
            {jobs.map((job: any) =>
                <FeedApplyJob job={job} key={job._id} />) ?? (
                    <p>No FeedApplyJob Found.</p>
                )}
        </Container>
    );
};

export default ApplyJob;
