import * as React from "react";
import { styled, makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { getCompany, getCity } from "redux/actions/user";
import { RootState } from "redux/reducers";
import { logOutUser } from "redux/actions/user";
import { Box, OutlinedInput, Toolbar, AppBar, Typography, Avatar, Divider, MenuItem as MenuItemCity, IconButton, Stack, Popover, MenuItem, CardHeader, Card, CardContent, Button, TextField } from '@mui/material';

import { StyledMenuItem } from '../../layouts/navigation/style'
import { BoxSpan } from '../../layouts/navigation/style'

import { IUser } from "redux/types/user";
import { ICity } from "redux/types/city";

import { Person } from '@mui/icons-material';
import LanguageIcon from '@mui/icons-material/Language';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PlaceIcon from '@mui/icons-material/Place';
import PaymentsIcon from '@mui/icons-material/Payments';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

import { Link, NavLink, useParams } from "react-router-dom";
import { TabContext } from "@material-ui/lab";

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
    cardHeader: {
        borderRadius: '12px',
        justifyContent: 'center',
        background: 'linear-gradient(90deg,#1c4742,#22c96d)',
        maxHeight: '100%',
        width: 1140,
        paddingTop: 30,
        paddingBottom: 30,
        boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px'
    },
    cardBody: {
        borderRadius: '12px',
        maxHeight: '100%',
        width: 1100,
        marginTop: "25px",
    }
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
const DetailCompany: React.FC = (): JSX.Element => {

    const dispatch = useDispatch();
    const params = useParams<RouteParams>();
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const [filterNameCity, setFilterNameCity] = React.useState('');
    const [cities, setCities] = React.useState<ICity[]>([]);

    const [value, setValue] = React.useState('1');

    const openUser = Boolean(anchorElUser);
    const handleClickUser = (event: any) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUser = () => {
        setAnchorElUser(null);
    };
    const classes = useStyles();

    const [users, setUsers] = React.useState<IUser[]>([]);
    const user = useSelector((state: RootState) => state.user);

    React.useEffect(() => {
        dispatch(getCompany());
    }, [dispatch]);

    React.useEffect(() => {
        dispatch(getCity());
    }, [dispatch]);

    React.useEffect(() => {
        setUsers(() =>
            user?.users?.filter((user: any) =>
                user._id == params.id
            ));
    }, [user]);

    React.useEffect(() => {
        setCities(() => user?.cities?.filter((city: any) => city.nameCity));
    }, [user]);

    const myInputProps_TenCity = {
        startAdornment: <Box style={{ fontSize: '12px', width: '150px' }}
        > Thành phố</Box>,
        style: {
            height: '48px',
        }
    }

    const handleFilterByNameCity = (event: any) => {
        const keyword = event.target.value;

        if (keyword !== '') {
            const results = user?.users?.filter((user: any) => {
                return user.city.nameCity.toLowerCase().startsWith(keyword.toLowerCase()) && user._id == params.id;
                // Use the toLowerCase() method to make it case-insensitive
            });
            setUsers(results);
        } else {
            setUsers(() => user?.users?.filter((users: any) => users.city.nameCity));
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
                            <img src="/logosnake.ico" style={{ height: "56px", width: "50px" }}></img>
                        </Link>
                        {/* <Box>
                            <Notifications style={{ color: 'black' }} />
                        </Box> */}
                        <Box flexGrow={1} />
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
                                            <Typography style={{ fontSize: '14px' }}>Công Việc Đã Lưu</Typography>
                                        </StyledMenuItem>

                                        <StyledMenuItem component={NavLink} to={'/applyJob'}>
                                            <Typography style={{ fontSize: '14px', float: 'left' }}>Công Việc Đã Ứng Tuyển</Typography>
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
                    {users && users.length > 0 ? (
                        <Box style={{ display: "flex", flexDirection: "row" }}>
                            <Box style={{ paddingLeft: '20px', top: 100, zIndex: 10, }}>
                                {users.map((user: any) =>
                                    <Box>
                                        <TabContext value={value}>
                                            <Box className={classes.cardHeader}>
                                                <Box display={'flex'} flexDirection={'row'} marginTop={1}>
                                                    <Avatar style={{
                                                        width: 170,
                                                        height: 170,
                                                        margin: "0px 40px"
                                                    }}
                                                        src={user.avatar}
                                                        aria-label="recipe" />

                                                    <Box sx={{ marginTop: "100px" }}>
                                                        <Box fontWeight={1000} fontSize={20} color={'white'} >{user.nameCompany}</Box>
                                                        <Box display={'flex'} flexDirection={'row'} sx={{ paddingTop: "20px", color: "white" }}>
                                                            <Box display={'flex'} flexDirection={'row'}>
                                                                <LanguageIcon sx={{ width: 18, marginRight: "10px" }} />
                                                                <Box display={'flex'} flexDirection={'row'}>
                                                                    <a href={user.webAddress} target='_blank' style={{ fontSize: "14px", paddingTop: "5px", textDecoration: 'none', color: "white" }}>{user.webAddress}</a>
                                                                </Box>
                                                            </Box>
                                                            <Box display={'flex'} flexDirection={'row'} sx={{ marginLeft: "20px" }}>
                                                                <LocationCityIcon sx={{ width: 18, marginRight: "10px" }} />
                                                                <Box display={'flex'} flexDirection={'row'}>
                                                                    <Box sx={{ fontSize: "14px", paddingTop: "5px" }}>{user.quantityEmployees} nhân viên</Box>
                                                                </Box>
                                                            </Box>
                                                        </Box>

                                                    </Box>
                                                </Box>
                                            </Box>
                                            <Box className={classes.cardBody} >
                                                <Box display={'flex'} flexDirection={'row'} >
                                                    <Box display={'flex'} flexDirection={'column'}>
                                                        <Card style={{ width: "750px", borderRadius: "12px" }}>
                                                            <CardHeader style={{ color: "white", fontSize: "14px", background: 'linear-gradient(90deg,#1c4742,#22c96d)' }}
                                                                titleTypographyProps={{ fontSize: '20px', fontWeight: 500 }}
                                                                title="Giới thiệu công ty" />
                                                            <CardContent style={{margin:"-10px 0px"}}>
                                                                <Typography sx={{ fontSize: '15px' }} dangerouslySetInnerHTML={{ __html: user.companyIntro }} />
                                                            </CardContent>
                                                        </Card>
                                                        <Card style={{ width: "750px", borderRadius: "12px", marginTop: "30px" }}>
                                                            <CardHeader style={{ color: "white", fontSize: "14px", background: 'linear-gradient(90deg,#1c4742,#22c96d)' }}
                                                                titleTypographyProps={{ fontSize: '20px', fontWeight: 500 }}
                                                                title="Tuyển dụng" />
                                                            <TextField
                                                                id="filled-select-currency"
                                                                select
                                                                value={filterNameCity}
                                                                onChange={handleFilterByNameCity}
                                                                variant="outlined"
                                                                InputProps={myInputProps_TenCity}
                                                                sx={{ width: 240, margin:'20px 30px' }}
                                                                className={classes.textfield}
                                                            >
                                                                {cities.map((city: any) => (
                                                                    <MenuItemCity key={city._id}
                                                                        value={city.nameCity}
                                                                        style={{ fontSize: "12px" }}
                                                                    >
                                                                        {city.nameCity}
                                                                    </MenuItemCity>
                                                                ))}
                                                            </TextField>
                                                            {user.job.map((job: any) =>
                                                                <Box>
                                                                    <Box display={'flex'} flexDirection={'row'} margin={'10px 30px 30px 30px'}>
                                                                        <Box display={'flex'} flexDirection={'row'} marginTop={1}>
                                                                            <Avatar style={{
                                                                                width: 75,
                                                                                height: 75,
                                                                                marginRight: 5,
                                                                            }}
                                                                                variant="square"
                                                                                src={user.avatar}
                                                                                aria-label="recipe" />

                                                                            <Box sx={{ marginLeft: "5px" }}>
                                                                                <Box fontWeight={1000} fontSize={16} >{job?.nameJob ?? null}</Box>
                                                                                <Box sx={{ fontSize: "14px", paddingTop: "10px" }}  >{user.nameCompany ?? null}</Box>
                                                                                <Box display={'flex'} flexDirection={'row'} sx={{ paddingTop: "10px", marginLeft: "-5px" }} >
                                                                                    <Box display={'flex'} flexDirection={'row'}>
                                                                                        <PlaceIcon sx={{ width: "18px" }}></PlaceIcon>
                                                                                        <Typography style={{ fontSize: '13px', padding: "4px 0px 0px 4px" }}>
                                                                                            {user.city.nameCity ?? null}
                                                                                        </Typography>
                                                                                    </Box>
                                                                                    <Box display={'flex'} flexDirection={'row'} sx={{ margin: "0px 15px" }}>
                                                                                        <PaymentsIcon sx={{ width: "18px" }}></PaymentsIcon>
                                                                                        <Typography style={{ fontSize: '13px', padding: "4px 0px 0px 4px" }}>
                                                                                            {new Intl.NumberFormat('de-DE').format(job.salary)} VNĐ một tháng
                                                                                        </Typography>
                                                                                    </Box>
                                                                                    <Box display={'flex'} flexDirection={'row'}>
                                                                                        <PeopleAltIcon sx={{ width: "18px" }}></PeopleAltIcon>
                                                                                        <Typography style={{ fontSize: '13px', padding: "4px 0px 0px 4px" }}>
                                                                                            {job.quantityRemaining} người
                                                                                        </Typography>
                                                                                    </Box>
                                                                                </Box>
                                                                            </Box>
                                                                        </Box>

                                                                        <Box flexGrow={1} />

                                                                        <Box sx={{ marginTop: "5px" }}>
                                                                            <Box sx={{ fontSize: 14, fontWeight: 500 }}>
                                                                                Hạn nộp hồ sơ
                                                                            </Box>
                                                                            <Box sx={{ fontSize: 13 }}>
                                                                                {job?.expirationDate ?? null}
                                                                            </Box>
                                                                            <Box sx={{ marginTop: "23px" }}>
                                                                                <Box component={Link} to={`/storageEvent/${job._id}`}>
                                                                                    <Button style={{
                                                                                        color: "rgb(33, 43, 54)",
                                                                                        height: "25px",
                                                                                        width: "95px",
                                                                                        fontSize: "12px",
                                                                                        borderRadius: "4px",
                                                                                        fontWeight: 500,
                                                                                        textTransform: "capitalize",
                                                                                        border: '1px solid rgb(33, 43, 54)'
                                                                                    }}
                                                                                    >Ứng Tuyển</Button>
                                                                                </Box>
                                                                            </Box>
                                                                        </Box>

                                                                    </Box>
                                                                    <Divider />
                                                                </Box>
                                                            )}
                                                        </Card>
                                                    </Box>
                                                    <Box>
                                                        <Card style={{ width: "360px", height: "190px", borderRadius: "12px", marginLeft: "30px" }}>
                                                            <CardHeader style={{ color: "white", fontSize: "14px", background: 'linear-gradient(90deg,#1c4742,#22c96d)' }}
                                                                titleTypographyProps={{ fontSize: '20px', fontWeight: 500 }}
                                                                title="Thông tin liên hệ" />
                                                            <CardContent>
                                                                <Box display={'flex'} flexDirection={'column'}>
                                                                    <Box display={'flex'} flexDirection={'row'}>
                                                                        <PlaceIcon style={{ width: "18px" }} />
                                                                        <Box sx={{ padding: "5px 0px 0px 10px", fontSize: "14px", fontWeight: 500 }}>
                                                                            Địa chỉ công ty
                                                                        </Box>
                                                                    </Box>
                                                                    <Box sx={{ fontSize: 15, padding: "10px 0px 0px 5px" }}>
                                                                        {user.address}
                                                                    </Box>
                                                                </Box>
                                                            </CardContent>
                                                        </Card>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </TabContext>
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    ) : (
                        <Box style={{ margin: "70px 0px" }}>
                            <Box>
                                <img style={{ width: "400px", display: "flex", margin: "auto" }} src="/not-found.png" />
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

export default DetailCompany;
