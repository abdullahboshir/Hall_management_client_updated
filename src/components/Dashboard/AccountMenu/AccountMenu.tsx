import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";

// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import dynamic from "next/dynamic";

const AuthButton = dynamic(
  () => import("@/components/UI/AuthButton/AuthButton"),
  { ssr: false }
);

// const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Dining", <AuthButton key="auth-btn" />];

function AccountMenu() {
  // const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
  //   null
  // );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  // const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorElNav(event.currentTarget);
  // };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  // const handleCloseNavMenu = () => {
  //   setAnchorElNav(null);
  // };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <React.Fragment>
      <Box display="flex" alignItems="center" textAlign="center">
        <Tooltip title="Open settings">
          <IconButton 
            onClick={handleOpenUserMenu} 
            sx={{ 
              p: 0,
              "& svg": {
                fontSize: { xs: "16px", sm: "20px" }
              }
            }}
          >
            {/* <Avatar alt={data?.name} src={data?.profileImg} /> */}
            <KeyboardArrowDownIcon />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ 
            mt: "45px",
            "& .MuiPaper-root": {
              minWidth: { xs: "120px", sm: "150px" }
            }
          }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting, index) => (
            <MenuItem 
              key={index} 
              onClick={handleCloseUserMenu}
              sx={{
                py: { xs: 1, sm: 1.5 },
                px: { xs: 1, sm: 2 }
              }}
            >
              <Typography 
                sx={{ 
                  textAlign: "center",
                  fontSize: { xs: "12px", sm: "14px" }
                }}
              >
                {setting}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </React.Fragment>
  );
}
export default AccountMenu;
