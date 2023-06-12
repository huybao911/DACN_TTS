import * as React from "react";
import { styled, alpha, makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { getJobs, getCity } from "redux/actions/user";
import { RootState } from "redux/reducers";
import { logOutUser } from "redux/actions/user";
import { Box, OutlinedInput, InputAdornment, TextField, Toolbar, AppBar, Typography, Avatar, ListItemIcon, Divider, MenuItem as MenuItemCity, IconButton, Stack, Popover, MenuItem } from '@mui/material';

import { StyledMenuItem } from '../../layouts/navigation/style'
import { BoxSpan } from '../../layouts/navigation/style'

import { IJobEvent } from "redux/types/jobEvent";
import { ICity } from "redux/types/city";

import FeedContent from "pages/contents/FeedContent";
import FeedDetailContent from "pages/contents/FeedDetailContent";

import { purple } from '@mui/material/colors';

import SearchIcon from '@mui/icons-material/Search';
import { Person, Notifications } from '@mui/icons-material';

import { Link, NavLink, useParams } from "react-router-dom";

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
const DetailContent: React.FC = (): JSX.Element => {

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
                job._id == params.id
            ));
    }, [user]);
    React.useEffect(() => {
        setCities(() => user?.cities?.filter((city: any) => city.nameCity));
    }, [user]);

    const myInputProps_TenCity = {
        startAdornment: <Box sx={{ fontSize: '12px', position: "start" }}
        > Thành phố</Box>,
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
            setJobs(() => user?.jobs?.filter((job: any) => event.city.nameCity));
        }

        setFilterNameCity(keyword);
    };

    React.useEffect(() => {
        document.title = "Trang Chủ | TTS";
    }, []);

    return (
        <Box>
            <Box>
                <StyledRoot style={{ boxShadow: "none", overflowX: "hidden" }}>
                    <Toolbar>
                        <Link style={{ textDecoration: 'none' }} to={'/user'}>
                            <img src="/hutech-logo.ico" style={{ height: "56px", width: "50px" }}></img>
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
                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={{
                                xs: 0.5,
                                sm: 1,
                            }}
                            sx={{ margin: 3, color: 'black' }}
                        >
                            <Box sx={{
                                display: 'flex', alignItems: 'center', textAlign: 'center'
                            }}>
                                <IconButton onClick={(event) => handleClickUser(event)}
                                    sx={{
                                        p: 0,

                                    }}>
                                    <Person style={{ color: "black" }} />
                                </IconButton>

                                <Popover
                                    open={openUser}
                                    anchorEl={anchorElUser}
                                    onClose={handleCloseUser}
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                    sx={{ marginLeft: 1 }}
                                    PaperProps={{
                                        style: {
                                            borderRadius: 20,
                                            boxShadow: 'rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) -20px 20px 40px -4px',
                                        },
                                        sx: {
                                            p: 1,
                                            width: 220,
                                            overflowX: 'unset',
                                            overflowY: 'unset',
                                            '& .MuiMenuItem-root': {
                                                px: 1,
                                                py: 1,
                                                typography: 'body2',
                                                borderRadius: 1,
                                                justifyContent: 'left'
                                            },
                                            '& .MuiAvatar-root': {
                                                width: 32,
                                                height: 32,
                                                ml: -0.5,
                                                mt: 1,
                                                mr: 1,
                                            },
                                        },
                                    }}
                                >

                                    <BoxSpan />
                                    <Stack sx={{ p: 0.5 }} >
                                        <StyledMenuItem component={NavLink} to={'/profile'} >
                                            <Box display={"flex"}>
                                                <Box>
                                                    <Avatar src={user.user.avatar} />
                                                </Box>
                                                <Box flexDirection={'column'}>
                                                    <Typography style={{ fontWeight: 500, fontSize: '14px' }}>{user.user.username}</Typography>
                                                    <Typography style={{ color: "#637381", fontSize: '13.5px' }} >{user.user.email}</Typography>
                                                </Box>
                                            </Box>
                                        </StyledMenuItem>

                                        <Divider sx={{ borderStyle: 'dashed' }} />

                                        <StyledMenuItem component={NavLink} to={'/storageEvent'}>
                                            <Typography style={{ fontSize: '14px' }}>Sự Kiện Đã Lưu</Typography>
                                        </StyledMenuItem>

                                        <StyledMenuItem component={NavLink} to={'/applyJob'}>
                                            <Typography style={{ fontSize: '14px', float: 'left' }}>Sự Kiện Đã Ứng Tuyển</Typography>
                                        </StyledMenuItem>

                                        <Divider sx={{ borderStyle: 'dashed' }} />

                                        <MenuItem className="navbar-logout" onClick={(e) => dispatch(logOutUser())}>
                                            <Typography style={{ fontSize: '14px' }}> Đăng Xuất</Typography>
                                        </MenuItem>
                                    </Stack>

                                </Popover>
                            </Box>
                        </Stack>
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
                                        <FeedContent job={job} key={job._id} />
                                    </Box>
                                )}
                            </Box>
                            <Box style={{ display: 'flex', paddingLeft: '20px', }}>
                                {jobs.map((job: any) =>
                                    <Box style={{
                                        width: "100%",
                                        height: 500,
                                        borderRadius: '12px',
                                        position: 'sticky',
                                        zIndex: 10,
                                        top: "100px",
                                    }}
                                    >
                                        <FeedDetailContent job={job} key={job._id} />
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
                                    Không Tồn Tại Công Việc
                                </Typography>
                            </Box>
                        </Box>
                    )}

                </Box >
            </Box>
        </Box >
    );
};

export default DetailContent;
