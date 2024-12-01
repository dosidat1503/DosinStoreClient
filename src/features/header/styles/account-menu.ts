import { Theme } from "@mui/material";

export const menuSlotProps = {
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
        left: "50%",
        transform: "translate(-50%, -50%) rotate(45deg)",
        width: 10,
        height: 10,
        bgcolor: "background.paper",
        zIndex: 0,
      },
    },
  },
};

export const menuItem = (theme: Theme) => ({
  "&:hover": {
    bgcolor: theme.palette.grey[200],
    borderRadius: 4,
  },
});

export const iconButton = (theme: Theme) => ({
  pl: 0,
  color: theme.palette.common.black,
});

export const typoGraphy = { fontWeight: "bold" };
