import * as React from 'react';
import { makeStyles } from "@material-ui/core/styles";

import { Avatar, Card, CardContent, CardHeader, IconButton, Toolbar, Typography, Divider, Grid, Box } from '@mui/material';
import { Bookmark, BookmarkBorder } from '@mui/icons-material';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import { green } from '@mui/material/colors';
import { createStorager, deleteStoragerInList } from "redux/actions/user";
import { formatDistance } from 'date-fns';

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/reducers";

import PlaceIcon from '@mui/icons-material/Place';
import PaymentsIcon from '@mui/icons-material/Payments';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

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
        marginBottom: 'auto'
    },
    card: {
        borderRadius: '12px',
        margin: 'auto',
        justifyContent: 'center',
        maxWidth: '100%',
        maxHeight: '100%',
        width: "950px"
    },
    myMedia: {
        width: "320px",
        borderRadius: "24px"
    },
    cardHold: {
        justifyContent: 'center',
        maxWidth: '100%',
        maxHeight: '100%',
        width: '500px',
        height: '800px',
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

const FeedStorageEvent: React.FC<Props> = ({ job }): JSX.Element => {

    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const [value, setValue] = React.useState('1');

    function handleClickStorage() {
        dispatch(createStorager(job._id));
    }

    function handleClickUnStorage() {
        dispatch(deleteStoragerInList(job._id));
    }

    function convertTZ(date: any, tzString: any) {
        return new Date(date).toLocaleString("en-TT", { timeZone: tzString });
    }

    const textAvatar = job.poster.username ?? null;
    const letterAvatar = textAvatar.charAt(0).toUpperCase();

    const lettercreatedAt = (formatDistance(new Date(job.createdAt), Date.now(), { addSuffix: true })).split("about");

    const storager = job.storagers.map((storager: any) => storager.storager.username);

    const storagers = job.storagers.some((storager: any) => user.user.username.includes(storager.storager.username));

    const compareUser = storagers ? (
        <Bookmark onClick={handleClickUnStorage} style={{ width: "30px", height: "30px", color: 'black', marginTop: "-50px", marginRight: "-50px" }} />
    ) : storager !== user.user.username ? (
        <BookmarkBorder onClick={handleClickStorage} style={{ width: "30px", height: "30px", color: 'black', marginTop: "-50px", marginRight: "-50px" }} />
    ) : null

    const classes = useStyles();

    return (
        <>
            <Toolbar className={classes.toolBar}>
                <Box className={classes.toolbarContent}>
                    <TabContext value={value}>
                        <TabPanel value="1" >
                            {/* de rieng ra 1 component */}
                            <Card className={classes.card}>
                                <Box sx={{ marginTop: "30px", marginLeft: "35px", width: "850px" }}>
                                    <Box display={'flex'} flexDirection={'row'} margin={'10px 0px'}>
                                        <Box display={'flex'} flexDirection={'row'} marginTop={1}>
                                            <Avatar style={{
                                                width: 100,
                                                height: 100,
                                                marginRight: 5,
                                            }}
                                                variant="square"
                                                src={job.poster.avatar}
                                                aria-label="recipe" />

                                            <Box>
                                                <Box fontWeight={1000} fontSize={20} >{job?.nameJob ?? null}</Box>
                                                <Box sx={{ fontSize: "16px", paddingTop: "20px" }}  >{job?.poster.nameCompany ?? null}</Box>
                                                <Box sx={{ fontSize: "14px", paddingTop: "17px" }}>
                                                    {job.storagers.filter((storager: any) => storager.storager.username == user.user.username).map((storager: any) =>
                                                        <Typography>
                                                            Ngày lưu: {convertTZ((storager.created), "Asia/Bangkok")}
                                                        </Typography>
                                                    )}
                                                </Box>
                                            </Box>
                                        </Box>

                                        <Box flexGrow={1} />

                                        <IconButton>
                                            {compareUser}
                                        </IconButton>
                                    </Box>
                                    <CardContent>
                                        <Box display={'flex'} flexDirection={'row'}>
                                            <Box display={'flex'} flexDirection={'row'}>
                                                <PlaceIcon sx={{ width: "18px" }}></PlaceIcon>
                                                <Typography style={{ fontSize: '15px', paddingTop: 2 }}>
                                                    {job.city.nameCity ?? null}
                                                </Typography>
                                            </Box>
                                            <Box display={'flex'} flexDirection={'row'} sx={{margin:"0px 20px"}}>
                                                <PaymentsIcon sx={{ width: "18px" }}></PaymentsIcon>
                                                <Typography style={{ fontSize: '15px', paddingTop: 2 }}>
                                                    {new Intl.NumberFormat('de-DE').format(job.salary)} VNĐ một tháng
                                                </Typography>
                                            </Box>
                                            <Box display={'flex'} flexDirection={'row'}>
                                                <PeopleAltIcon sx={{ width: "18px" }}></PeopleAltIcon>
                                                <Typography style={{ fontSize: '15px', paddingTop: 2 }}>
                                                    {job.quantityRemaining} người
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </CardContent >
                                </Box>
                            </Card>
                        </TabPanel>
                    </TabContext>

                </Box>
            </Toolbar >
        </>
    );
};

export default FeedStorageEvent;
