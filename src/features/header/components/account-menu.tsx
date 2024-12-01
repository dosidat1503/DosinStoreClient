import Logout from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import Typography from "@mui/material/Typography";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import useTheme from "@mui/material/styles/useTheme";
import { useNavigate } from "react-router-dom";
import routes from "@/configs/routes";
import { iconButton, menuItem, menuSlotProps, typoGraphy } from "@/features/header/styles";
import { useAppSelector } from "@/store";
import { logout } from "@/ultils/token";

interface AccountMenuProps {
  anchorEl: null | HTMLElement;
  open: boolean;
  handleClose: () => void;
}

const AccountMenu = (props: AccountMenuProps) => {
  const { anchorEl, open, handleClose } = props;
  const theme = useTheme();
  const navigate = useNavigate();
  const isSignIn = useAppSelector((state) => state.auth.isSignIn);

  const guestMenu = [
    {
      icon: <LoginIcon />,
      handle: () => navigate(routes.authenticate),
      name: "Đăng nhập",
    },
    {
      icon: <AppRegistrationIcon />,
      handle: () => navigate(routes.authenticate),
      name: "Đăng ký",
    },
  ];

  const userMenu = [
    {
      icon: <AssignmentIndIcon />,
      handle: () => navigate(routes.accountInfo),
      name: "Tài khoản",
    },
    {
      icon: <RequestQuoteIcon />,
      handle: () => navigate(routes.myOrder),
      name: "Đơn hàng",
    },
    {
      icon: <Logout fontSize="small" />,
      handle: () => {
        // localStorage.removeItem("auth_token");

        logout();
      },
      name: "Đăng Xuất",
    },
  ];

  const menuList = isSignIn ? userMenu : guestMenu;

  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={handleClose}
      MenuListProps={{ onMouseLeave: handleClose }}
      slotProps={menuSlotProps}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      {menuList.map((item) => (
        <MenuItem key={item.name} onClick={item.handle} sx={menuItem(theme)}>
          <IconButton sx={iconButton(theme)}>{item.icon}</IconButton>
          <Typography sx={typoGraphy}>{item.name}</Typography>
        </MenuItem>
      ))}
    </Menu>
  );
};

export default AccountMenu;
