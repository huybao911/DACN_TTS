import * as React from "react";
import { styled } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { getStorager } from "redux/actions/user";
import { RootState } from "redux/reducers";
import { IJobEvent } from "redux/types/jobEvent";
import FeedStorageEvent from "pages/User/FeedStorageEvent";
import { Typography, OutlinedInput, InputAdornment, Box, Container } from '@material-ui/core';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router-dom";

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
    width: 240,
    '& fieldset': {
        borderWidth: `1px !important`,
        // borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
        borderColor: '#rgba(0, 0, 0, 0.87)'
    },
}));

const StoragePost: React.FC = (): JSX.Element => {

    const dispatch = useDispatch();

    const [jobs, setJobs] = React.useState<IJobEvent[]>([]);
    const [filterName, setFilterName] = React.useState('');
    const user = useSelector((state: RootState) => state.user);

    React.useEffect(() => {
        dispatch(getStorager());
    }, [dispatch]);

    React.useEffect(() => {
        setJobs(() =>
            user?.jobs?.filter((job: any) =>
                job.nameJob
            ));
    }, [user]);

    React.useEffect(() => {
        document.title = "Lưu Bài Viết | TTS";
    }, []);

    const handleFilterByName = (event: any) => {
        const keyword = event.target.value;

        if (keyword !== '') {
            const results = user?.jobs?.filter((job: any) => {
                return job.namejob.toLowerCase().startsWith(keyword.toLowerCase());
                // Use the toLowerCase() method to make it case-insensitive
            });
            setJobs(results);
        } else {
            setJobs(() => user?.jobs?.filter((job: any) => job.namejob));
        }

        setFilterName(keyword);
    };

    return (
        <Container>
            <Typography style={{ fontSize: "30px", fontWeight: "bold", margin: "30px 0px 0px -83px", }}>Công Việc Đã Lưu</Typography>
            <Box textAlign={"center"} sx={{ flexGrow: 1 }}>
                <StyledSearch
                    style={{ borderRadius: '20px', fontSize: '15px', height: "48px", width: "500px", marginRight: '16px' }}
                    value={filterName}
                    onChange={handleFilterByName}
                    placeholder="Tìm kiếm..."
                    startAdornment={
                        <InputAdornment position="start" style={{ paddingLeft: 1.3 }}>
                            <SearchIcon style={{ width: '20px' }} sx={{ color: 'rgba(0, 0, 0, 0.87)' }} />
                        </InputAdornment>
                    }
                />
            </Box>
            {jobs.map((job: any) =>
                <Link style={{ textDecoration: "none" }} to={`/storageEvent/${job._id}`}>
                    <FeedStorageEvent job={job} key={job._id} />
                </Link>
            )}
        </Container>
    );
};

export default StoragePost;
