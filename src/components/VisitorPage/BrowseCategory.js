import { useEffect, useState } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {
  Box,
  InputLabel,
  ListItemText,
  MenuItem,
  TextField,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function BrowseCategory() {
  const location = useLocation();
  const { categoryName } = useParams();
  const [browseCategory, setBrowseCategory] = useState(
    "Anime"
    //   () => {
    //   if (location.pathname.indexOf("/animes") > -1) {
    //     return "Anime";
    //   } else if (location.pathname.indexOf("/mangas") > -1) {
    //     return "Manga";
    //   } else {
    //     return "";
    //   }
    // }
  );
  const navigate = useNavigate();

  const handleChangeBrowseCategory = (event) => {
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
    if (browseCategory === "Manga") {
      navigate("mangas");
    }
  }, [browseCategory, navigate]);

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
        sx={{ color: "primary.main", fontWeight: 550, fontSize: "1.25rem" }}
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
                  padding: "8px 0",
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
                    padding: "12px 20px",
                    minHeight: "100%",
                    "& .MuiCheckbox-root": {
                      padding: 0,
                    },
                    "& .MuiTypography-root": {
                      fontSize: "1rem",
                      fontWeight: 550,
                    },
                    "&.Mui-selected": {
                      color: "info.main",
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
                fontSize: "1.2rem",
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
