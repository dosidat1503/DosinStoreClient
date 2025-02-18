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
import AccountMenu from "@/features/header/components/account-menu";
import Container from "@mui/material/Container";
import Badge from "@mui/material/Badge";
import Typography from "@mui/material/Typography";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import Navigation from "@/features/header/components/header-navigation";
import { useNavigate } from "react-router-dom";
import style from "@/features/cart/styles/cart-popup.module.scss";
import CartPopup from "@/features/cart/components/cart-popup";
import {
  boxOnToolbar,
  dosinIconButton,
  menuContainer,
  searchContainer,
  searchIconButton,
  searchInputBase,
} from "@/features/header/styles";
import routes from "@/configs/routes";
import { useCartInfo } from "@/features/cart/hooks/use-cart-info";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { data } = useCartInfo();
  const carts = data?.data || [];

  const theme = useTheme();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const query = (event.target as HTMLInputElement).value;
      navigate(`${routes.collection}?query=${query}`);
    }
  };

  return (
    <AppBar position="sticky" elevation={0}>
      <Box sx={boxOnToolbar}></Box>
      <Toolbar>
        <Container maxWidth="lg">
          <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" padding="10px" spacing={2}>
            <IconButton onClick={handleLogoClick} sx={dosinIconButton}>
              <DosinLogo />
            </IconButton>
            <Paper sx={searchContainer}>
              <InputBase sx={searchInputBase} placeholder="Tìm kiếm sản phẩm" onKeyDown={handleKeyDown} />
              <IconButton sx={searchIconButton(theme)} aria-label="search">
                <SearchIcon sx={{ color: theme.palette.common.white }} />
              </IconButton>
            </Paper>
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              <div className={style.openPopup}>
                <IconButton>
                  <Badge badgeContent={carts.length || 0} color="secondary">
                    {" "}
                    <AddShoppingCartIcon />
                  </Badge>
                </IconButton>
                <CartPopup />
              </div>
              <Paper
                elevation={0}
                sx={menuContainer}
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
