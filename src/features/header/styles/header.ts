import { Theme } from "@mui/material/styles";

export const dosinIconButton = { padding: 0, cursor: "pointer" };
export const searchInputBase = { ml: 2, flex: 1 };

export const searchContainer = {
  p: "2px 4px",
  display: "flex",
  alignItems: "center",
  width: { xs: "100%", md: "50%" },
  borderRadius: "10px",
  boxShadow: "5px 2px 8px rgba(0, 0, 0, 0.3)",
  height: "100%",
};

export const boxOnToolbar = {
  height: "15px",
  width: "100%",
  bgcolor: "black",
};

export const searchIconButton = (theme: Theme) => ({
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
});

export const menuContainer = {
  display: "flex",
  alignItems: "center",
  padding: "8px 4px",
  borderRadius: "20px",
  backgroundColor: "#f5faff",
  justifyContent: "space-between",
};
