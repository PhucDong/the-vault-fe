import { useEffect, useState } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {
  Box,
  InputLabel,
  ListItemText,
  MenuItem,
  TextField,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

function BrowseCategory() {
  const location = useLocation();
  const [browseCategory, setBrowseCategory] = useState(() => {
    if (location.pathname === "/" || location.pathname.includes("/animes")) {
      localStorage.clear();
      return "Anime";
    } else if (location.pathname.includes("/mangas")) {
      localStorage.clear();
      return "Manga";
    } else {
      if (localStorage.getItem("category")) {
        return localStorage.getItem("category");
      } else {
        return "Anime";
      }
    }
  });
  const navigate = useNavigate();

  const handleChangeBrowseCategory = (event) => {
    localStorage.setItem("category", event.target.value);

    if (event.target.value === "Manga") {
      navigate("/mangas");
    } else if (event.target.value === "Anime") {
      navigate("/animes");
    }
    setBrowseCategory(event.target.value);
  };

  const [openBrowseCategoryDropdownMenu, setOpenBrowseCategoryDropdownMenu] =
    useState(false);

  const handleOpenBrowseCategoryDropdownMenu = () => {
    setOpenBrowseCategoryDropdownMenu(true);
  };

  const handleCloseBrowseCategoryDropdownMenu = () => {
    setOpenBrowseCategoryDropdownMenu(false);
  };

  useEffect(() => {
    if (location.pathname === "/" || location.pathname.includes("/animes"))
      setBrowseCategory("Anime");
    else if (location.pathname.includes("/mangas")) setBrowseCategory("Manga");
  }, [location.pathname]);

  return (
    <Box
      sx={{
        display: "flex",
        gap: "8px",
        alignItems: "center",
        marginBottom: "12px",
      }}
    >
      <InputLabel
        id="browse-label"
        className="section-label"
        sx={{
          color: "primary.main",
          fontWeight: 550,
          fontSize: { xs: "1.4rem", sm: "1.6rem" },
          lineHeight: "100%",
        }}
      >
        Browse
      </InputLabel>
      <TextField
        name="itemType"
        className="section-input"
        required
        select
        hiddenLabel
        value={browseCategory}
        onChange={handleChangeBrowseCategory}
        slotProps={{
          select: {
            renderValue: (selected) => selected,
            open: openBrowseCategoryDropdownMenu,
            onOpen: handleOpenBrowseCategoryDropdownMenu,
            onClose: handleCloseBrowseCategoryDropdownMenu,
            IconComponent: KeyboardArrowRightIcon,
            MenuProps: {
              PaperProps: {
                sx: {
                  boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.2)",
                },
              },
              sx: {
                "& .MuiMenu-paper": {
                  padding: 0,
                },
                "& .MuiMenu-list": {
                  padding: 0,
                  "& .MuiMenuItem-root": {
                    padding: "16px",
                    minHeight: "100%",
                    "& .MuiCheckbox-root": {
                      padding: 0,
                    },
                    "& .MuiTypography-root": {
                      fontSize: { xs: "1rem", sm: "1.2rem" },
                      fontWeight: 550,
                    },
                    "&.Mui-selected": {
                      color: "info.main",
                      backgroundColor: "rgba(17, 17, 17, 0.08)",

                      "&:hover": {
                        backgroundColor: "rgba(17, 17, 17, 0.08)",
                      },
                    },
                  },
                },
              },
            },
          },
        }}
        sx={{
          "& .MuiOutlinedInput-input": {
            padding: 0,
          },
          "& .MuiOutlinedInput-root": {
            display: "flex",
            padding: "8px 16px",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "4px",
            backgroundColor: "#E9E9E9",
            borderRadius: "8px",
            "& .MuiOutlinedInput-notchedOutline": { border: "none" },
            "& .MuiInputBase-input": {
              "&.MuiOutlinedInput-input": {
                fontSize: { xs: "1.2rem", sm: "1.4rem" },
                padding: 0,
                minHeight: "100%",
                height: "100%",
              },
            },
          },
          "& .MuiSvgIcon-root": {
            position: "initial",
            fontSize: "1.75rem",
            transform: openBrowseCategoryDropdownMenu && "rotate(90deg)",
          },
        }}
      >
        {["Anime", "Manga"].map((type) => (
          <MenuItem
            key={type}
            value={type}
            onClick={() =>
              handleChangeBrowseCategory({ target: { value: type } })
            }
          >
            <ListItemText primary={type} />
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}

export default BrowseCategory;
