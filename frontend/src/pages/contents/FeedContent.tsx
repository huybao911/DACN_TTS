import * as React from 'react';
import { makeStyles } from "@material-ui/core/styles";

import { Avatar, Card, Box, CardMedia, IconButton, Typography } from '@mui/material';
import { Divider } from '@mui/material';
import { Bookmark, BookmarkBorder } from '@mui/icons-material';
import TabContext from '@mui/lab/TabContext';
import { createStorager, deleteStorager } from "redux/actions/user";

import { formatDistance } from 'date-fns';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "redux/reducers";

import PaymentsIcon from '@mui/icons-material/Payments';
import { Link } from 'react-router-dom';


type Props = {
    job: any;
};

const useStyles = makeStyles((theme) => ({
    toolBar: {
        dislay: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    toolbarContent: {
        justifyContent: 'center',
        backgroundColor: 'none',
        flexDirection: 'column',
        marginBottom: 'auto',
        letterSpacing: 0.6
    },
    card: {
        borderRadius: '12px',
        margin: 'auto',
        justifyContent: 'center',
        maxHeight: '100%',
        width: '600px',
        marginBottom: 30,
        boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px'
    },
    myMedia: {
        width: "450px",
        borderRadius: "16px"
    },
    cardHold: {
        justifyContent: 'center',
        maxWidth: '100%',
        maxHeight: '100%',
        width: '500px',
        borderRadius: '12px',

    },
    button: {
        backgroundColor: '#CBB7F5',
        color: '#434343',
        height: '40px',
        width: '100px',
        fontSize: '12px',
        fontWeight: 'bold',
        textTransform: 'none',
        margin: '7px 0px 0px 10px',
        borderRadius: '10px',
        border: '1px solid',
        borderColor: '#808080',
    },
    toolbarTitle: {
        justifyContent: 'center',
        paddingTop: '11px',
        backgroundColor: 'white',
        maxWidth: '100%'
    },
    box: {
        justifyContent: 'center',
        textAlign: 'center'
    },
    tabClick: {
        '& .MuiTabs-indicator': {
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: 'transparent',
        },
        '& .MuiTabs-indicatorSpan': {
            maxWidth: 50,
            width: '100%',
            backgroundColor: '#F8D6A4',
            borderRadius: 4
        },
        "& .MuiTab-root.Mui-selected": {
            color: 'black'
        }
    },
    tab: {
        textTransform: 'none',
        fontFamily: '',
        fontSize: '16px',
        borderRadius: 2,
        fontWeight: 'bold',
    }

}));

const FeedContent: React.FC<Props> = ({ job }): JSX.Element => {

    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const [value, setValue] = React.useState('1');

    function handleClickStorage() {
        dispatch(createStorager(job._id));
    }

    function handleClickUnStorage() {
        dispatch(deleteStorager(job._id));
    }
    const textAvatar = job?.poster.username ?? null;
    const letterAvatar = textAvatar.charAt(0).toUpperCase();

    const lettercreatedAt = (formatDistance(new Date(job?.createdAt), Date.now(), { addSuffix: true })).split("about");

    const storager = job.storagers.map((storager: any) => storager.storager.username);

    const storagers = job.storagers.some((storager: any) => user.user.username.includes(storager.storager.username));

    const compareUser = storagers ? (
        <Bookmark onClick={handleClickUnStorage} style={{ width: "30px", height: "30px", color: 'rgb(33, 43, 54)' }} />
    ) : storager !== user.user.username ? (
        <BookmarkBorder onClick={handleClickStorage} style={{ width: "30px", height: "30px", color: 'rgb(33, 43, 54)' }} />
    ) : null

    const classes = useStyles();

    return (
        <Box className={classes.toolbarContent}>
            <TabContext value={value}>

                {/* de rieng ra 1 component */}
                <Card className={classes.card}>
                    <Box margin={'0px 26px'}>
                        <Box style={{ marginTop: "30px", fontSize: "20px", fontWeight: "bold" }}>
                            {job?.nameJob ?? null}
                        </Box>
                    </Box>

                    <Divider sx={{ margin: '20px 0px' }} />
                    <Box margin={'0px 26px'}>
                        <Box display={'flex'} flexDirection={'row'} margin={'10px 0px'}>
                            <Box display={'flex'} flexDirection={'row'} marginTop={1}>
                                <Avatar style={{
                                    width: 36,
                                    height: 36,
                                    marginRight: 5,
                                }}
                                    variant="square"
                                    src={job.poster.avatar}
                                    aria-label="recipe" />

                                <Box>
                                    <Link style={{ textDecoration: "none", color:"black" }} to={`/company/${job.poster._id}`}>
                                        <Box fontWeight={1000} >{job?.poster.nameCompany ?? null}</Box>
                                    </Link>

                                    <Box sx={{ fontSize: "14px", paddingTop: "2px" }}>Thành phố {job.city.nameCity}</Box>
                                </Box>
                            </Box>

                            <Box flexGrow={1} />

                            <IconButton aria-label='settings'>
                                {compareUser}
                            </IconButton>
                        </Box>
                    </Box>

                    <Box margin={'0px 26px'}>
                        <Box style={{ marginBottom: '30px', paddingTop: '10px' }}>
                            <Box display={'flex'} flexDirection={'row'} marginBottom={2} letterSpacing={0.6}>
                                <Box sx={{
                                    textAlign: 'left',
                                    fontSize: '14px',
                                    color: '#757575',
                                    paddingRight: 1,
                                    fontWeight: 500
                                }}>
                                    Hạn nộp hồ sơ:
                                </Box>
                                <Box style={{ textAlign: 'left', fontSize: '14px', fontWeight: '1000' }}>
                                    {job?.expirationDate ?? null}
                                </Box>
                            </Box>
                            <Box display={'flex'} flexDirection={'row'} marginBottom={4} letterSpacing={0.6}>
                                <PaymentsIcon style={{ width: "18px" }}></PaymentsIcon>
                                <Box style={{ textAlign: 'left', fontSize: '15px', padding: '4px 0px 0px 2px', fontWeight: '1000' }}>
                                    {new Intl.NumberFormat('de-DE').format(job.salary)} VNĐ một tháng
                                </Box>
                            </Box>
                            <Box style={{ textAlign: 'left', fontSize: '14px', fontWeight: '1000', marginLeft: "-20px" }} dangerouslySetInnerHTML={{ __html: job.jobDescription }} />
                            <Box sx={{ color: '#757575', fontSize: '14px' }}>Posted {lettercreatedAt}</Box>
                        </Box >
                    </Box>
                </Card>
            </TabContext>
        </Box>
    );
};

export default FeedContent;
