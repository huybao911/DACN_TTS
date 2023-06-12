import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { logOutUser } from "redux/actions/user";
import { logOutCompany } from "redux/actions/company";
import { logOutAdmin } from "redux/actions/admin";
import { RootState } from "redux/reducers";
import { Box, Drawer, Avatar, Typography, Divider } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';

import NavSection from "./navSelection";

const NAV_WIDTH = 270;

const SideBar: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);
  const company = useSelector((state: RootState) => state.company);
  const admin = useSelector((state: RootState) => state.admin);

  const topLinks =
   company.isAuthenticated && company.getRole.keyRole === "company" ? (
      <Box>
        <Box
          style={{
            display: "flex", flexDirection: "row",
            borderRadius: "16px", padding: "20px 10px",
            backgroundColor: '#f5f5f5', marginTop: '40px'
          }}>
          <Box>
            <Avatar style={{ backgroundColor: "green", margin: "5px 10px", width: "32px", height: "32px" }} src={company.company.avatar}/>
          </Box>
          <Box style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
            <Box style={{ fontSize: "14px", marginBottom: "5px" }}>
              {company.company.username}
            </Box>
            <Typography style={{ fontSize: "13px" }}>
              {company.getRole.nameRole}
            </Typography>
          </Box>
        </Box>
      </Box>
    ) : admin.isAuthenticated && admin.getRole.keyRole === "admin" ? (
      <Box>
        <Box
          style={{
            display: "flex", flexDirection: "row",
            borderRadius: "16px", padding: "20px 10px",
            backgroundColor: '#f5f5f5', marginTop: '40px'
          }}>
          <Box>
            <Avatar style={{ backgroundColor: "green", margin: "0 10px" }}>
              {admin.admin.username.charAt(0).toUpperCase()}
            </Avatar>
          </Box>
          <Box style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
            <Box style={{ fontSize: "14px", marginBottom: "5px" }}>
              {admin.admin.username}
            </Box>
            <Typography style={{ fontSize: "13px" }}>
              {admin.getRole.nameRole}
            </Typography>
          </Box>
        </Box>
      </Box>
    ) : null;



  const bottomLinks = user.isAuthenticated ? (
    <Box onClick={(e) => dispatch(logOutUser())} style={{ display: 'flex', marginBottom: "20px", justifyContent: 'center', cursor: 'pointer' }}>
      <Box style={{
        border: '1px solid #b5b5b5',
        borderRadius: '12px', textAlign: 'center',
        marginTop: '20px', padding: '6px', paddingTop: '8px',
        width: 140, display: 'flex', flexDirection: 'row', justifyContent: 'center'
      }}>
        <Typography style={{ fontSize: '14px', paddingRight: '10px' }} >
          Đăng xuất
        </Typography>
        <LogoutIcon style={{ width: '14px', color: '#ee6f81', paddingBottom: '2px' }} />
      </Box>
    </Box>
  ) : admin.isAuthenticated ? (
    <Box onClick={(e) => dispatch(logOutAdmin())} style={{ display: 'flex', marginBottom: "20px", justifyContent: 'center', cursor: 'pointer' }}>
      <Box style={{
        border: '1px solid #b5b5b5',
        borderRadius: '12px', textAlign: 'center',
        marginTop: '20px', padding: '6px', paddingTop: '8px',
        width: 140, display: 'flex', flexDirection: 'row', justifyContent: 'center'
      }}>
        <Typography style={{ fontSize: '14px', paddingRight: '10px' }} >
          Đăng xuất
        </Typography>
        <LogoutIcon style={{ width: '14px', color: '#ee6f81', paddingBottom: '2px' }} />
      </Box>
    </Box>
  ) : company.isAuthenticated ? (
    <Box onClick={(e) => dispatch(logOutCompany())} style={{ display: 'flex', marginBottom: "20px", justifyContent: 'center', cursor: 'pointer' }}>
      <Box style={{
        border: '1px solid #b5b5b5',
        borderRadius: '12px', textAlign: 'center',
        marginTop: '20px', padding: '6px', paddingTop: '8px',
        width: 140, display: 'flex', flexDirection: 'row', justifyContent: 'center'
      }}>
        <Typography style={{ fontSize: '14px', paddingRight: '10px' }} >
          Đăng xuất
        </Typography>
        <LogoutIcon style={{ width: '14px', color: '#ee6f81', paddingBottom: '2px' }} />
      </Box>
    </Box>
  ) :null

  const sideBar = admin.isAuthenticated || company.isAuthenticated  ? (
    <>
      <Box component="nav"
        sx={{
          flexShrink: { lg: 0 },
          width: { lg: NAV_WIDTH },
        }}>
        <Drawer
          open
          variant='permanent'
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed'
            }
          }}>

          <Box sx={{ px: 2, py: 3, display: 'inline-block', fontWeight: "bold" }}>
            {topLinks}
          </Box>
          <Divider />

          <NavSection />
          <Box flexGrow={1} />

          <Divider  />
          {bottomLinks}

        </Drawer>
      </Box>

    </>
  ) : null

  return (
    <>
      {sideBar}
    </>
  );
};

export default SideBar;
