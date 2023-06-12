import * as React from 'react';
import { makeStyles } from "@material-ui/core/styles";

import { Button, Card, CardContent, Toolbar, Box, Avatar, Typography } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import PaymentsIcon from '@mui/icons-material/Payments';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';

import { userApplyJob, userUnApplyJob } from "redux/actions/user";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "redux/reducers";

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
        borderRadius: '22px',
        margin: 'auto',
        justifyContent: 'center',
        maxWidth: '100%',
        maxHeight: '100%',
        width: '950px',
        height: '250px',
    },
    myMedia: {
        height: "250px",
        // paddingTop: '56.25%', // 16:9,
        marginTop: '30'
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

const FeedApplyJob: React.FC<Props> = ({ job }): JSX.Element => {

    const dispatch = useDispatch();
    const [value, setValue] = React.useState('1');

    const user = useSelector((state: RootState) => state.user);

    const classes = useStyles();

    const findJobUserApply = job.usersApplyJob.filter((userapply: any) => userapply.userApply.username === user.user.username);

    const userApply = job.usersApplyJob.map((userapply: any) => userapply.userApply.username);

    const userApplys = job.usersApplyJob.some((userapply: any) => user.user.username.includes(userapply.userApply.username));

    function convertTZ(date: any, tzString: any) {
        return new Date(date).toLocaleString("en-TT", { timeZone: tzString });
    }

    return (
        <>
            {findJobUserApply.map((userapply: any) =>
                <Toolbar key={userapply._id} className={classes.toolBar}>
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
                                                        <Typography>
                                                            Thời gian ứng tuyển: {convertTZ((userapply.created), "Asia/Bangkok")}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Box>
                                            <Box flexGrow={1} />
                                            {userapply.notiApplyJob == "Đã ứng tuyển" ? (
                                                <Box sx={{ marginTop: "10px", fontWeight: "500", color: "#3b78dc" }}>
                                                    {userapply.notiApplyJob}
                                                </Box>
                                            ) : userapply.notiApplyJob == "NTD xem hồ sơ" ? (
                                                <Box sx={{ marginTop: "10px", fontWeight: "500", color: "#f70" }}>
                                                    {userapply.notiApplyJob}
                                                </Box>
                                            ) : userapply.notiApplyJob == "Hồ sơ phù hợp" ? (
                                                <Box sx={{ marginTop: "10px", fontWeight: "500", color: "#00b14f" }}>
                                                    {userapply.notiApplyJob}
                                                </Box>
                                            ) : null
                                            }
                                        </Box>
                                        <CardContent>
                                            <Box display={'flex'} flexDirection={'row'}>
                                                <Box display={'flex'} flexDirection={'row'}>
                                                    <Box display={'flex'} flexDirection={'row'}>
                                                        <PlaceIcon sx={{ width: "18px" }}></PlaceIcon>
                                                        <Typography style={{ fontSize: '15px', paddingTop: 2 }}>
                                                            {job.city.nameCity ?? null}
                                                        </Typography>
                                                    </Box>
                                                    <Box display={'flex'} flexDirection={'row'} sx={{ margin: "0px 20px" }}>
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
                                                <Box flexGrow={1} />
                                                <Box>
                                                    {userApplys ? (
                                                        user.user.username == userapply.userApply.username && userapply.notiApplyJob == "Đã ứng tuyển" ? (
                                                            <Box>
                                                                <Button style={{ backgroundColor: "red", color: "white", height: "30px", width: "120px", fontSize: "12px", fontWeight: "bold", borderRadius: "6px", textTransform: "capitalize", marginRight:"-30px" }} onClick={(e) => dispatch(userUnApplyJob(job._id))}>Hủy Ứng Tuyển</Button>
                                                            </Box>
                                                        ) : null
                                                    ) : userApply !== user.user.username ? (
                                                        <Box>
                                                            <Button style={{ backgroundColor: "#00B14F", color: "white", height: "30px", width: "120px", fontSize: "12px", fontWeight: "bold", borderRadius: "6px", textTransform: "capitalize", marginRight:"-30px" }} onClick={(e) => dispatch(userApplyJob(job._id))}>Ứng Tuyển</Button>
                                                        </Box>
                                                    ) : null
                                                    }
                                                </Box>
                                            </Box>
                                        </CardContent>
                                    </Box>
                                </Card>
                            </TabPanel>
                        </TabContext>

                    </Box>
                </Toolbar >
            )}
        </>
    );
};

export default FeedApplyJob;
