import * as React from "react";
import { styled, makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { getJobs, getCity } from "redux/actions/user";
import { RootState } from "redux/reducers";
import { Box, OutlinedInput, InputAdornment, TextField, Toolbar, AppBar, Typography, Avatar, ListItemIcon, Divider, MenuItem as MenuItemCity, IconButton, Stack, Popover, MenuItem } from '@mui/material';

import { StyledMenuItem } from '../../layouts/navigation/style'
import { BoxSpan } from '../../layouts/navigation/style'

import { IJobEvent } from "redux/types/jobEvent";
import { ICity } from "redux/types/city";

import FeedGuest from "pages/guest/FeedGuest";
import FeedDetailGuest from "pages/guest/FeedDetailGuest";

import SearchIcon from '@mui/icons-material/Search';
import { Person, PersonAdd } from '@mui/icons-material';

import { Link, useParams } from "react-router-dom";

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
    width: 240,
    '& fieldset': {
        borderWidth: `1px !important`,
        // borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
        borderColor: '#rgba(0, 0, 0, 0.87)'
    },
}));

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
}))

const StyledRoot = styled(AppBar)(() => ({
    boxShadow: 'none',
    width: '100%',
    backgroundColor: 'white',
    fontWeight: 'bold',
}));
interface RouteParams {
    id: string
}
const DetailGuest: React.FC = (): JSX.Element => {

    const dispatch = useDispatch();
    const params = useParams<RouteParams>();
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const openUser = Boolean(anchorElUser);
    const handleClickUser = (event: any) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUser = () => {
        setAnchorElUser(null);
    };
    const classes = useStyles();
    const [filterName, setFilterName] = React.useState('');

    const [filterNameCity, setFilterNameCity] = React.useState('');

    const [jobs, setJobs] = React.useState<IJobEvent[]>([]);
    const [jobDetails, setJobDetails] = React.useState<IJobEvent[]>([]);
    const [cities, setCities] = React.useState<ICity[]>([]);
    const user = useSelector((state: RootState) => state.user);

    React.useEffect(() => {
        dispatch(getJobs());
    }, [dispatch]);

    React.useEffect(() => {
        dispatch(getCity());
    }, [dispatch]);

    React.useEffect(() => {
        setJobs(() =>
            user?.jobs?.filter((job: any) =>
                job.nameJob
            ));
    }, [user]);
    React.useEffect(() => {
        setJobDetails(() =>
            user?.jobs?.filter((job: any) =>
                job._id == params.id
            ));
    }, [user]);
    React.useEffect(() => {
        setCities(() => user?.cities?.filter((city: any) => city.nameCity));
    }, [user]);

    const myInputProps_TenCity = {
        startAdornment: <Box sx={{ fontSize: '12px', width: '150px' }}
        > Thành phố </Box>,
        style: {
            height: '48px',
        }
    }

    const handleFilterByName = (event: any) => {
        const keyword = event.target.value;

        if (keyword !== '') {
            const results = user?.jobs?.filter((job: any) => {
                return job.nameJob.toLowerCase().startsWith(keyword.toLowerCase());
                // Use the toLowerCase() method to make it case-insensitive
            });
            setJobs(results);
        } else {
            setJobs(() => user?.jobs?.filter((job: any) => job.nameJob));
        }

        setFilterName(keyword);
    };

    const handleFilterByNameCity = (event: any) => {
        const keyword = event.target.value;

        if (keyword !== '') {
            const results = user?.jobs?.filter((job: any) => {
                return job.city.nameCity.toLowerCase().startsWith(keyword.toLowerCase());
                // Use the toLowerCase() method to make it case-insensitive
            });
            setJobs(results);
        } else {
            setJobs(() => user?.jobs?.filter((job: any) => job.city.nameCity));
        }

        setFilterNameCity(keyword);
    };

    React.useEffect(() => {
        document.title = "Trang Chủ";
    }, []);

    return (
        <Box>
            <Box>
                <StyledRoot style={{ boxShadow: "none", overflowX: "hidden" }}>
                    <Toolbar>
                        <Link style={{ textDecoration: 'none' }} to={'/'}>
                            <img src="/logosnake.ico" style={{ height: "56px", width: "50px" }}></img>
                        </Link>
                        <Box textAlign={"center"} sx={{ flexGrow: 1 }}>
                            <StyledSearch
                                style={{ borderRadius: '20px', fontSize: '13px', height: "48px", marginRight: '16px' }}
                                value={filterName}
                                onChange={handleFilterByName}
                                placeholder="Tìm kiếm công việc..."
                                startAdornment={
                                    <InputAdornment position="start" style={{ paddingLeft: 1.3 }}>
                                        <SearchIcon style={{ width: '16px' }} sx={{ color: 'rgba(0, 0, 0, 0.87)' }} />
                                    </InputAdornment>
                                }
                            />
                            <TextField
                                id="filled-select-currency"
                                select
                                value={filterNameCity}
                                onChange={handleFilterByNameCity}
                                variant="outlined"
                                InputProps={myInputProps_TenCity}
                                style={{ width: 240 }}
                                className={classes.textfield}
                            >
                                {cities.map((city) => (
                                    <MenuItemCity key={city._id}
                                        value={city.nameCity}
                                        style={{ fontSize: "12px" }}
                                    >
                                        {city.nameCity}
                                    </MenuItemCity>
                                ))}
                            </TextField>
                        </Box>
                        {/* <Box>
                            <Notifications style={{ color: 'black' }} />
                        </Box> */}
                        <Box
                            style={{ textDecoration: "none", color: "#212B36", marginRight: 14, fontSize: 14 }}
                            component={Link} to={"/loginuser"}
                        >
                            Đăng nhập
                        </Box>
                        <Box
                            style={{ backgroundColor: 'rgb(33, 43, 54)', color: "white", fontSize: 13, fontWeight: "400", borderRadius: 4, textDecoration: "none", padding: 6.5 }}
                            component={Link} to={"/register"}
                        >
                            Đăng ký
                        </Box>
                    </Toolbar>
                </StyledRoot>
            </Box>
            <Box style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center'
            }}>
                <Box style={{ display: "flex", flexDirection: "row" }} >
                    {jobs && jobs.length > 0 ? (
                        <Box style={{ display: "flex", flexDirection: "row" }}>
                            <Box style={{ paddingLeft: '20px', top: 100, zIndex: 10, }}>
                                {jobs.map((job: any) =>
                                    <Box>
                                        <Link style={{ textDecoration: "none" }} to={`/guestEvent2/${job._id}`}>
                                            <FeedGuest job={job} key={job._id} />
                                        </Link>
                                    </Box>
                                )}
                            </Box>
                            <Box style={{ display: 'flex', paddingLeft: '20px', }}>
                                {jobDetails.map((job: any) =>
                                    <Box style={{
                                        width: '100%',
                                        height: 500,
                                        borderRadius: '12px',
                                        position: 'sticky',
                                        zIndex: 10,
                                        top: "100px",
                                    }}
                                    >
                                        <FeedDetailGuest job={job} key={job._id} />
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    ) : (
                        <Box style={{ margin: "70px 0px" }}>
                            <Box>
                                <img style={{ width: "400px", height: "410px", display: "flex", margin: "auto" }} src="/not-found.png" />
                            </Box>
                            <Box>
                                <Typography style={{ fontSize: "45px", fontWeight: "bold" }}>
                                    Không Tồn Tại Sự Kiện
                                </Typography>
                            </Box>
                        </Box>
                    )}

                </Box >
            </Box>
        </Box >
    );
};

export default DetailGuest;
