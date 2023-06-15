import * as React from "react";
import { styled, alpha } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { getJobs, approveUserApplyJob, readCV } from "redux/actions/company";
import { RootState } from "redux/reducers";
import { IJobEvent } from "redux/types/jobEvent";
import { Avatar, TableSortLabel, IconButton, Toolbar, OutlinedInput, InputAdornment, Button, Card, Container, Popover, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography, FormControl } from "@mui/material";
// @mui
import CheckIcon from '@mui/icons-material/Check';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from "@mui/system";
import { visuallyHidden } from '@mui/utils';

import { useParams } from 'react-router-dom';

const StyledRoot = styled(Toolbar)(({ theme }) => ({
    height: 96,
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1, 0, 3),
}));

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
    width: 240,
    transition: theme.transitions.create(['box-shadow', 'width'], {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.shorter,
    }),
    '&.Mui-focused': {
        width: 320,
    },
    '& fieldset': {
        borderWidth: `1px !important`,
        borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
    },
}));

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

interface DataUser {
    _id: keyof IJobEvent;
    nameJob: keyof IJobEvent;
    userApply: keyof IJobEvent;
    applyStatus: keyof IJobEvent;
    approve: keyof IJobEvent;
    readCV: keyof IJobEvent;
}

interface HeadCell {
    _id: keyof DataUser;
    label: string;
    numeric: boolean;
}

const headCells: HeadCell[] = [
    {
        _id: 'nameJob',
        numeric: false,
        label: 'Tên công việc',
    },
    {
        _id: 'userApply',
        numeric: false,
        label: 'Người ứng tuyển',
    },
    {
        _id: 'applyStatus',
        numeric: false,
        label: 'Trạng thái',
    },
    {
        _id: 'approve',
        numeric: false,
        label: '',
    },
    {
        _id: 'readCV',
        numeric: false,
        label: '',
    },
];


interface EnhancedTableProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof DataUser) => void;
    order: Order;
    orderBy: string;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { order, orderBy, onRequestSort } =
        props;
    const createSortHandler =
        (property: keyof DataUser) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };
    return (
        <TableHead style={{ backgroundColor: "#f4f5f5" }}
            sx={{
                '& th:first-child': {
                    borderRadius: '1em 0 0 0'
                },
                '& th:last-child': {
                    borderRadius: '0 1em 0 0'
                }
            }}>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell._id}
                        align={headCell.numeric ? 'right' : 'left'}
                        style={{ fontSize: '13px' }}
                        sortDirection={orderBy === headCell._id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell._id}
                            direction={orderBy === headCell._id ? order : 'asc'}
                            onClick={createSortHandler(headCell._id)}
                        >
                            {headCell.label}
                            {orderBy === headCell._id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}
interface RouteParams {
    id: string
}
const ListUserApply: React.FC = (): JSX.Element => {

    const dispatch = useDispatch();
    const params = useParams<RouteParams>();


    const [jobs, setJobs] = React.useState<IJobEvent[]>([]);
    const company = useSelector((state: RootState) => state.company);

    const [anchorEl, setAnchorEl] = React.useState([null]);
    const [anchorCV, setAnchorCV] = React.useState([null]);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [filterName, setFilterName] = React.useState('');

    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof DataUser>('nameJob');



    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof DataUser,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const handleChangePage = (event: any, newPage: any) => {
        setPage(newPage);
    };

    const handleFilterByName = (event: any) => {
        setPage(0);
        const keyword = event.target.value;

        if (keyword !== '') {
            const results = company?.jobs?.filter((job: any) => {
                return job.nameJob.toLowerCase().startsWith(keyword.toLowerCase());
                // Use the toLowerCase() method to make it case-insensitive
            });
            setJobs(results);
        } else {
            setJobs(() => company?.jobs?.filter((job: any) => job.nameJob));
            // If the text field is empty, show all users
        }

        setFilterName(keyword);
    };

    const handleOpenMenu = (event: any, index: any) => {
        const newAnchorEls = [
            ...anchorEl.slice(0, index),
            event.currentTarget,
            ...anchorEl.slice(index + 1)
        ];
        setAnchorEl(newAnchorEls);
    };

    const handleCloseMenu = (index: any) => {
        const newAnchorEls = [
            ...anchorEl.slice(0, index),
            null,
            ...anchorEl.slice(index + 1)
        ];
        setAnchorEl(newAnchorEls);
    };

    const handleOpenMenuCV = (event: any, index: any) => {
        const newAnchorCVs = [
            ...anchorCV.slice(0, index),
            event.currentTarget,
            ...anchorCV.slice(index + 1)
        ];
        setAnchorCV(newAnchorCVs);
    };

    const handleCloseMenuCV = (index: any) => {
        const newAnchorCVs = [
            ...anchorCV.slice(0, index),
            null,
            ...anchorCV.slice(index + 1)
        ];
        setAnchorCV(newAnchorCVs);
    };

    const sortApplyJob = stableSort(jobs, getComparator(order, orderBy));

    React.useEffect(() => {
        dispatch(getJobs());
    }, [dispatch]);
    // if (window.location.href.indexOf('reload') == -1) {
    //   window.location.replace(window.location.href + '?reload');
    // }

    React.useEffect(() => {

        setJobs(() => company?.jobs?.filter((job: any) => job._id == params.id));
    }, [company]);

    React.useEffect(() => {
        document.title = "LIST USER APPLY";
    }, []);

    return (

        <>
            <Container>
                <Card style={{ padding: "20px", marginTop: "40px", paddingBottom: "40px", borderRadius: "22px" }}>
                    <StyledRoot
                        style={{ display: "flex", flexDirection: "row" }}
                        sx={{
                            color: 'primary.main',
                            bgcolor: 'primary.lighter',
                        }}
                    >
                        <Box>
                            <Typography gutterBottom style={{ color: "black", fontSize: "22px" }}>
                                Danh Sách Ứng Tuyển
                            </Typography>
                        </Box>
                        <Box style={{ display: "flex", flexDirection: "row" }} >
                            <Box style={{ marginRight: "14px" }}>
                                <StyledSearch
                                    style={{ borderRadius: '30px', fontSize: '13px', height: "48px" }}
                                    value={filterName}
                                    onChange={handleFilterByName}
                                    placeholder="Tìm kiếm..."
                                    startAdornment={
                                        <InputAdornment position="start" sx={{ paddingLeft: 1.3 }}>
                                            <SearchIcon style={{ width: '16px' }} sx={{ color: 'text.disabled' }} />
                                        </InputAdornment>
                                    }
                                />
                            </Box>
                        </Box>
                    </StyledRoot>
                    <TableContainer>
                        {/* Table user */}
                        <Table >
                            <EnhancedTableHead
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                            />
                            {jobs && jobs.length > 0 ? (
                                <TableBody>
                                    {sortApplyJob.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((job: any, index) =>
                                        <TableRow key={job._id}>
                                            <TableCell align="left" sx={{ width: "200px", fontSize: '12px' }}>
                                                <Box >
                                                    {job?.nameJob ?? null}
                                                </Box>
                                            </TableCell>
                                            <TableCell align="left" sx={{ width: "150px" }}>
                                                {job.usersApplyJob.map((user: any, index: number) =>
                                                    <Box key={user._id} style={{ display: "flex", flexDirection: "column", marginTop: "14px", paddingBottom: "14px" }}>
                                                        <Button style={{ fontSize: '12px', fontWeight: "normal", textTransform: "lowercase", width: "40px" }} size="small" color="inherit" onClick={(jobApply) => handleOpenMenu(jobApply, index)} >
                                                            {user.userApply.username}
                                                        </Button>
                                                        <Popover
                                                            open={!!anchorEl[index]}
                                                            anchorEl={anchorEl[index]}
                                                            onClose={() => handleCloseMenu(index)}
                                                            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                                                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                                            PaperProps={{
                                                                sx: {

                                                                    width: 340,
                                                                    '& .MuiMenuItem-root': {
                                                                        px: 1,
                                                                        typography: 'body2',
                                                                        borderRadius: 0.75,
                                                                    },
                                                                },
                                                            }}
                                                        >
                                                            <Box style={{ display: "flex", flexDirection: "column" }}>
                                                                <Box sx={{ textAlign: "center", fontWeight: "bold", marginBottom: "10px" }}>
                                                                    {user.userApply.username}
                                                                </Box>
                                                                <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(2, 1fr)', backgroundColor: "rgba(0,0,0,0.03)", color: "rgb(33, 43, 54)", marginBottom: 4, padding: 3, borderRadius: 4 }}>
                                                                    <FormControl sx={{
                                                                        textAlign: 'left',
                                                                        fontSize: '14px',
                                                                        color: '#757575',
                                                                        fontWeight: 500,
                                                                        marginTop: 1
                                                                    }} >
                                                                        Họ tên
                                                                    </FormControl>
                                                                    <FormControl sx={{ textAlign: 'right', fontSize: '14px', fontWeight: '1000', marginTop: 1 }}>
                                                                        {user.userApply.fullName}
                                                                    </FormControl>
                                                                    <FormControl sx={{
                                                                        textAlign: 'left',
                                                                        fontSize: '14px',
                                                                        color: '#757575',
                                                                        fontWeight: 500,
                                                                        marginTop: 1
                                                                    }} >
                                                                        Trường đại học
                                                                    </FormControl>
                                                                    <FormControl sx={{ textAlign: 'right', fontSize: '14px', fontWeight: '1000', marginTop: 1 }}>
                                                                        {user.userApply.university}
                                                                    </FormControl>
                                                                    <FormControl sx={{
                                                                        textAlign: 'left',
                                                                        fontSize: '14px',
                                                                        color: '#757575',
                                                                        fontWeight: 500,
                                                                        marginTop: 1
                                                                    }} >
                                                                        Địa chỉ
                                                                    </FormControl>
                                                                    <FormControl sx={{ textAlign: 'right', fontSize: '14px', fontWeight: '1000', marginTop: 1 }}>
                                                                        {user.userApply.address}
                                                                    </FormControl>
                                                                </Box>
                                                            </Box>
                                                        </Popover>
                                                    </Box>

                                                )}
                                            </TableCell>
                                            <TableCell align="left" sx={{ width: "150px", fontSize: '12px' }}>
                                                {job.usersApplyJob.map((user: any) =>
                                                    <Box key={job._id} style={{ display: "flex", flexDirection: "column", marginTop: "20px", paddingBottom: "20px" }}>
                                                        {user.applyStatus}
                                                    </Box>
                                                )}
                                            </TableCell>
                                            <TableCell align="left" sx={{ width: "50px", fontSize: '12px' }}>
                                                {job.usersApplyJob.map((user: any, index: number) =>
                                                    <Box key={job._id} style={{ display: "flex", flexDirection: "column", marginTop: "5px", paddingBottom: "10px" }}>
                                                        <Button onClick={(job) => handleOpenMenuCV(job, index)} >
                                                            <VisibilityIcon onClick={(e) => dispatch(readCV(job._id, user._id))} style={{ color: "black" }}>
                                                            </VisibilityIcon>
                                                        </Button>
                                                        <Popover
                                                            open={!!anchorCV[index]}
                                                            anchorEl={anchorCV[index]}
                                                            onClose={() => handleCloseMenuCV(index)}
                                                            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                                                            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                                            PaperProps={{
                                                                sx: {
                                                                    backgroundImage: `url(${user.userApply.cv})`,
                                                                    backgroundRepeat: "no-repeat",
                                                                    backgroundPosition: 'center',
                                                                    backgroundSize: '100% 100%',
                                                                    width: 658.6,
                                                                    height: 900,
                                                                    '& .MuiMenuItem-root': {
                                                                        px: 1,
                                                                        typography: 'body2',
                                                                        borderRadius: 0.75,
                                                                    },
                                                                },
                                                            }}
                                                        >
                                                        </Popover>
                                                    </Box>
                                                )}
                                            </TableCell>
                                            <TableCell align="left" sx={{ width: "50px", fontSize: '12px' }}>
                                                {job.usersApplyJob.map((user: any) =>
                                                    <Box key={job._id} style={{ display: "flex", flexDirection: "column", marginTop: "5px", paddingBottom: "10px" }}>
                                                        <IconButton onClick={(e) => dispatch(approveUserApplyJob(job._id, user._id))} style={{ color: "black" }}>
                                                            <CheckIcon />
                                                        </IconButton>
                                                    </Box>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    )}

                                    <TableRow>
                                        <TablePagination
                                            style={{ fontSize: "12px" }}
                                            sx={{
                                                '& .MuiTablePagination-selectLabel': {
                                                    fontSize: "12px"
                                                },
                                                '& .MuiTablePagination-selectIcon': {
                                                    width: "16px"
                                                },
                                                '& .MuiTablePagination-displayedRows': {
                                                    fontSize: "12px"
                                                },
                                                '& .MuiSvgIcon-root': {
                                                    fontSize: "16px"
                                                },
                                            }}
                                            rowsPerPageOptions={[5, 10, 25]}
                                            labelRowsPerPage={"Số lượng hàng:"}
                                            count={jobs.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                            SelectProps={{
                                                MenuProps: {
                                                    sx: {
                                                        "&& .MuiTablePagination-menuItem": {
                                                            fontSize: "12px"
                                                        }
                                                    }
                                                }
                                            }}
                                        />
                                    </TableRow>
                                </TableBody>
                            ) : (
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                            <Typography variant="h6" paragraph>
                                                Không tồn tại user
                                            </Typography>

                                            <Typography variant="body2">
                                                Không tìm thấy kết quả &nbsp;
                                                <strong>&quot;{filterName}&quot;</strong>.
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            )}
                        </Table>
                    </TableContainer>
                </Card>
            </Container>
        </>
    );
};

export default ListUserApply;
