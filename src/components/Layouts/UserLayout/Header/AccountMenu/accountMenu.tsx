import Logout from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import Typography from "@mui/material/Typography";
import useTheme from "@mui/material/styles/useTheme";

interface AccountMenuProps {
  anchorEl: null | HTMLElement;
  open: boolean;
  handleClose: () => void;
}

const AccountMenu = (props: AccountMenuProps) => {
  const { anchorEl, open, handleClose } = props;
  const theme = useTheme();
  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={handleClose}
      MenuListProps={{ onMouseLeave: handleClose }}
      slotProps={{
        paper: {
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            borderRadius: 2,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              left: "50%", // Căn giữa theo chiều ngang
              transform: "translate(-50%, -50%) rotate(45deg)", // Dịch để mũi nhọn nằm ở giữa và xoay 45 độ
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              zIndex: 0,
            },
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MenuItem
        onClick={handleClose}
        sx={{
          "&:hover": {
            bgcolor: theme.palette.grey[200],
            borderRadius: 4,
          },
        }}
      >
        <IconButton sx={{ pl: 0, color: theme.palette.common.black }}>
          <AssignmentIndIcon />
        </IconButton>
        <Typography sx={{ fontWeight: "bold" }}>Tài khoản</Typography>
      </MenuItem>
      <MenuItem
        onClick={handleClose}
        sx={{
          "&:hover": {
            bgcolor: theme.palette.grey[200],
            borderRadius: 4,
          },
        }}
      >
        <IconButton sx={{ pl: 0, color: theme.palette.common.black }}>
          <RequestQuoteIcon />
        </IconButton>
        <Typography sx={{ fontWeight: "bold" }}>Đơn hàng</Typography>
      </MenuItem>
      <Divider />
      <MenuItem
        onClick={handleClose}
        sx={{
          "&:hover": {
            bgcolor: theme.palette.grey[200],
            borderRadius: 4,
          },
        }}
      >
        <IconButton sx={{ pl: 0, color: theme.palette.common.black }}>
          <Logout fontSize="small" />
        </IconButton>
        <Typography sx={{ fontWeight: "bold" }}>Đăng Xuất</Typography>
      </MenuItem>
    </Menu>
  );
};

export default AccountMenu;
