import * as React from 'react';
import { makeStyles } from "@material-ui/core/styles";

import { Divider } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import { Box, Button, FormControl, Avatar } from '@mui/material';
import { userApplyJob, userUnApplyJob } from "redux/actions/user";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "redux/reducers";
import { BoxNameDetails, BoxDetails } from 'layouts/navigation/style';

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

    card: {
        borderRadius: '12px',
        justifyContent: 'center',
        backgroundColor: 'white',
        maxHeight: '100%',
        width: 800,
        paddingTop: 30,
        paddingBottom: 30,
        boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px'
    },
    myMedia: {
        width: "440px",
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

const FeedDetailContent: React.FC<Props> = ({ job }): JSX.Element => {

    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const [value, setValue] = React.useState('1');

    const userApply = job.usersApplyJob.map((userapply: any) => userapply.userApply.username);

    const userApplys = job.usersApplyJob.some((userapply: any) => user.user.username.includes(userapply.userApply.username));

    const compareUserApply = userApplys ? (
        job.usersApplyJob.some((userjob: any) => user.user.username.includes(userjob.userApply.username)) ? (
            <Button style={{
                color: "#FF6969",
                height: "30px",
                width: "120px",
                fontSize: "12px",
                fontWeight: 500,
                borderRadius: "4px",
                textTransform: "capitalize",
                border: '1px solid #FF6969'
            }}
                onClick={(e) => dispatch(userUnApplyJob(job._id))}>Hủy Ứng Tuyển</Button>

        ) : (
            <Button style={{
                color: "rgb(33, 43, 54)",
                height: "30px",
                width: "120px",
                fontSize: "12px",
                borderRadius: "4px",
                fontWeight: 500,
                textTransform: "capitalize",
                border: '1px solid rgb(33, 43, 54)'
            }}
                onClick={(e) => dispatch(userApplyJob(job._id))}>Ứng Tuyển</Button>
        )
    ) : userApply !== user.user.username ? (
        <Button style={{
            color: "rgb(33, 43, 54)",
            height: "30px",
            width: "120px",
            fontSize: "12px",
            borderRadius: "4px",
            fontWeight: 500,
            textTransform: "capitalize",
            border: '1px solid rgb(33, 43, 54)'
        }}
            onClick={(e) => dispatch(userApplyJob(job._id))}>Ứng Tuyển</Button>
    ) : null

    const classes = useStyles();

    return (
        <Box >
            <TabContext value={value}>
                <Box className={classes.card}>
                    {/* <Box margin={'10px 26px'}>
                        <Box sx={{ fontSize: "20px", fontWeight: "bold" }}>
                            Khoa {event.departmentEvent.nameDepartment.toLowerCase()}
                        </Box>
                        <Box sx={{ fontSize: "14px" }}>
                            {event?.poster.username ?? null}
                        </Box>
                    </Box> */}


                    {/* <Divider /> */}

                    <BoxDetails >
                        <Box sx={{ fontSize: "14px" }}>
                            <BoxNameDetails>
                                {job.nameJob}
                            </BoxNameDetails>
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
                                        <Box fontWeight={1000} >{job?.poster.nameCompany ?? null}</Box>
                                        <Box sx={{ fontSize: "14px", paddingTop: "2px" }}>Thành phố {job.city.nameCity}</Box>
                                    </Box>
                                </Box>
                                <Box flexGrow={1}></Box>
                                <Box sx={{ marginTop: "15px" }}>
                                    {compareUserApply}
                                </Box>
                            </Box>
                            <Box display={'flex'} flexDirection={'row'} sx={{ marginTop: '20px' }}>
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

                        </Box>
                    </BoxDetails>

                    <Divider />
                    <Box style={{ overflowY: "auto", height: "500px" }}>
                        <Box style={{ margin: '20px 26px' }}>
                            <BoxNameDetails>
                                Chi tiết công việc
                            </BoxNameDetails>
                            <Box display={'flex'} flexDirection={'column'}>
                                <Box display={'flex'} flexDirection={'row'}>
                                    <PlaceIcon sx={{ width: "18px" }}></PlaceIcon>
                                    <Box sx={{ fontSize: "15px", padding: '4px 0px 0px 15px', fontWeight: '1000' }}>
                                        Địa chỉ công ty
                                    </Box>
                                </Box>
                                <Box sx={{ fontSize: '13px', fontWeight: '700', marginLeft: '33px', width: 400, padding: "6px 0px", color: "rgba(0,0,0,0.7)" }}>
                                    {job.poster.address}
                                </Box>
                                <Box display={'flex'} flexDirection={'row'}>
                                    <PaymentsIcon sx={{ width: "18px" }}></PaymentsIcon>
                                    <Box sx={{ fontSize: "15px", padding: '4px 0px 0px 15px', fontWeight: '1000' }}>
                                        Lương
                                    </Box>
                                </Box>
                                <Box sx={{ fontSize: '13px', fontWeight: '700', marginLeft: '33px', width: 155, padding: "6px 0px", color: "rgba(0,0,0,0.7)" }}>
                                    {new Intl.NumberFormat('de-DE').format(job.salary)} VNĐ một tháng
                                </Box>
                                <Box display={'flex'} flexDirection={'row'}>
                                    <PeopleAltIcon sx={{ width: "18px" }}></PeopleAltIcon>
                                    <Box sx={{ fontSize: "15px", padding: '4px 0px 0px 15px', fontWeight: '1000' }}>
                                        Số lượng tuyển
                                    </Box>
                                </Box>
                                <Box sx={{ fontSize: '13px', fontWeight: '700', marginLeft: '33px', width: 155, padding: "6px 0px", color: "rgba(0,0,0,0.7)" }}>
                                    {job.quantityRemaining} người
                                </Box>
                            </Box>
                        </Box>

                        <Divider />
                        <Box style={{ margin: '20px 26px 0px 26px' }}>
                            <Box display={'flex'} flexDirection={'column'}>
                                <Box sx={{
                                    textAlign: 'left',
                                    fontSize: '14px',
                                    fontWeight: 1000
                                }}>
                                    Mô tả công việc:
                                </Box>
                                <Box sx={{ fontSize: '14px', textAlign: "left", lineHeight: "1.8" }} dangerouslySetInnerHTML={{ __html: job.jobDescription }} />
                            </Box>
                            <Box display={'flex'} flexDirection={'column'}>
                                <Box sx={{
                                    textAlign: 'left',
                                    fontSize: '14px',
                                    fontWeight: 1000
                                }}>
                                    Yêu cầu công việc:
                                </Box>
                                <Box sx={{ fontSize: '14px', textAlign: "left", lineHeight: "1.8" }} dangerouslySetInnerHTML={{ __html: job.jobRequest }} />
                            </Box>
                            <Box display={'flex'} flexDirection={'column'}>
                                <Box sx={{
                                    textAlign: 'left',
                                    fontSize: '14px',
                                    fontWeight: 1000
                                }}>
                                    Quyền lợi được hưởng:
                                </Box>
                                <Box sx={{ fontSize: '14px', textAlign: "left", lineHeight: "1.8" }} dangerouslySetInnerHTML={{ __html: job.benefit }} />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </TabContext>
        </Box>
    );
};

export default FeedDetailContent;
