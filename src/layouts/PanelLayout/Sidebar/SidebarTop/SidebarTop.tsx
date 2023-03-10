import { Dispatch, SetStateAction } from "react";
import { MenuOpen } from "@mui/icons-material";
import { Box, IconButton, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
interface Props {
  menuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
  setDrawerOpen: Dispatch<SetStateAction<boolean>>;
}
function SidebarTop({ menuOpen, setMenuOpen, setDrawerOpen }: Props) {
  const theme = useTheme();
  const mdMatches = useMediaQuery(theme.breakpoints.up("md"));
  const clickHandler = () => {
    if (mdMatches) {
      setMenuOpen((prevState) => !prevState);
    } else {
      setDrawerOpen(false);
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingY: "20px",
        paddingLeft: menuOpen ? "10px" : "4px",
        paddingRight: menuOpen ? "0px" : "4px",
        img: { width: "110px", height: "30px" },
      }}
    >
      {menuOpen && (
        <Link to="/">
          <img
            src="https://res.cloudinary.com/dmgb7kvmn/image/upload/v1665232770/digita-images/static/gw8lwcaggvlzyxmmufm3.png"
            alt="digita-logo"
          />
        </Link>
      )}
      <IconButton
        sx={{
          "&:hover ": { background: "common.panelHoverGrey" },
        }}
        onClick={clickHandler}
      >
        <MenuOpen sx={{ color: "common.panelGrey", fontSize: "22px" }} />
      </IconButton>
    </Box>
  );
}

export default SidebarTop;
