import {
  BottomNavigation,
  BottomNavigationAction,
} from "@mui/material";
import { useState } from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import MovieIcon from "@mui/icons-material/Movie";
import HomeIcon from "@mui/icons-material/Home";

function MainHeader() {
  const [bottomNavItemValue, setBottomNavItemValue] = useState(1);

  return (
    <BottomNavigation
      showLabels
      value={bottomNavItemValue}
      onChange={(event, value) => setBottomNavItemValue(value)}
      sx={{
        gap: "8px",
        padding: "8px 0",
        height: "64px",
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        "& .MuiButtonBase-root": {
          color: "primary.light",
          padding: 0,
          gap: "4px",
          "& .MuiSvgIcon-root": { fontSize: "2rem" },
          "& .MuiBottomNavigationAction-label": {
            fontWeight: 550,
            fontSize: "1rem",
            lineHeight: "100%",
          },
          "&.Mui-selected": {
            color: "primary.main",
          },
        },
      }}
    >
      <BottomNavigationAction value={1} label="Home" icon={<HomeIcon />} />
      <BottomNavigationAction value={2} label="Anime" icon={<MovieIcon />} />
      <BottomNavigationAction value={3} label="Manga" icon={<MenuBookIcon />} />
    </BottomNavigation>
  );
}

export default MainHeader;
