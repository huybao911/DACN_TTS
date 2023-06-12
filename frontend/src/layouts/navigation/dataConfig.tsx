import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LeaderboardIcon from '@mui/icons-material/Leaderboard'
import EventIcon from '@mui/icons-material/Event';
import WcIcon from '@mui/icons-material/Wc';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ApartmentIcon from '@mui/icons-material/Apartment';

export const dataAdmin = [
    {
        icon: <LeaderboardIcon style={{width: '18px'}} />,
        name: 'Bảng Điều Khiển',
        path: '/*'
    },

    {
        icon: <AccountCircleIcon style={{width: '18px'}} />,
        name: 'Người Dùng',
        path: '/users'
    },
    {
        icon: <WorkOutlineIcon style={{width: '18px'}}/>,
        name: 'Công Việc',
        path: '/jobEventAdmin'
    },
    {
        icon: <ApartmentIcon style={{width: '18px'}}/>,
        name: 'Thành Phố',
        path: '/city'
    },
    {
        icon: <WcIcon style={{width: '18px'}}/>,
        name: 'Giới Tính',
        path: '/gt'
    },
];

export const dataCompany = [
    {
        icon: <AccountBoxIcon style={{width: '18px'}}/>,
        name: 'Hồ Sơ Công Ty',
        path: '/profileCompany'
    },
    {
        icon: <WorkOutlineIcon style={{width: '18px'}}/>,
        name: 'Công Việc',
        path: '/job'
    },
];