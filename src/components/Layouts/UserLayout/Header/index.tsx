import Stack from "@mui/material/Stack";
import { ReactComponent as DosinLogo } from "@/assets/dosinLogo.svg";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useTheme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import AccountMenu from "./AccountMenu/accountMenu";
import Container from "@mui/material/Container";
import Badge from "@mui/material/Badge";
import Typography from "@mui/material/Typography";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import Navigation from "./HeaderNavigation/headerNavigation";
import { useNavigate } from "react-router-dom";
import style from "@/features/cart/styles/cart-popup.module.scss";
import CartPopup from "@/features/cart/components/cart-popup";

const Header = () => {
  const theme = useTheme();

  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar position="sticky" elevation={0}>
      <Box
        sx={{
          height: "15px",
          width: "100%",
          bgcolor: "black",
        }}
      ></Box>
      <Toolbar>
        <Container maxWidth="lg">
          <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" padding="10px" spacing={2}>
            <IconButton onClick={handleLogoClick} sx={{ padding: 0, cursor: "pointer" }}>
              <DosinLogo />
            </IconButton>
            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: { xs: "100%", md: "50%" },
                borderRadius: "10px",
                boxShadow: "5px 2px 8px rgba(0, 0, 0, 0.3)",
                height: "100%",
              }}
            >
              <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Tìm kiếm sản phẩm" />
              <IconButton
                type="submit"
                sx={{
                  p: "10px",
                  bgcolor: theme.palette.common.black,
                  borderRadius: "10px",
                  my: 0.1,
                  boxShadow: "4px 4px 12px rgba(0, 0, 0, 0.3)",
                  "&:hover": {
                    bgcolor: "#a1a1a1",
                    color: theme.palette.common.black,
                    "& .MuiSvgIcon-root": {
                      color: theme.palette.common.black,
                    },
                  },
                }}
                aria-label="search"
              >
                <SearchIcon
                  sx={{
                    color: theme.palette.common.white,
                  }}
                />
              </IconButton>
            </Paper>
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              <div className={style.openPopup}>
                <IconButton>
                  <Badge badgeContent={4} color="secondary">
                    {" "}
                    <AddShoppingCartIcon />
                  </Badge>
                </IconButton>
                <CartPopup />
              </div>
              <Paper
                elevation={0}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: "8px 4px",
                  borderRadius: "20px",
                  backgroundColor: "#f5faff",
                  justifyContent: "space-between",
                }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onMouseOver={handleClick}
              >
                <Tooltip title="Account">
                  <IconButton
                    onMouseOver={handleClick}
                    size="small"
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <Avatar sx={{ width: 32, height: 32 }}>
                      <AccountCircleIcon />
                    </Avatar>
                  </IconButton>
                </Tooltip>
                <Box ml={1}>
                  <Typography variant="body2" color="textSecondary">
                    Tài khoản
                  </Typography>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Xin chào!
                  </Typography>
                </Box>
                <IconButton>
                  <ExpandCircleDownIcon />
                </IconButton>
              </Paper>
            </Stack>
          </Stack>
        </Container>
        <AccountMenu anchorEl={anchorEl} open={open} handleClose={handleClose} />
      </Toolbar>
      <Navigation />
    </AppBar>
  );
};

export default Header;
