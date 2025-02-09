import {
  Box,
  InputLabel,
  ListItemText,
  MenuItem,
  TextField,
} from "@mui/material";
import { useState } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useAppSelector, useReviewAppDispatch } from "../../services/hooks";
import { selectReviewFormat } from "../../store/slices/review/reviewSlice";

function ReviewFormat() {
  const format = useAppSelector(selectReviewFormat);
  const { updateFormat } = useReviewAppDispatch();
  const [openFormatDropdownMenu, setOpenFormatDropdownMenu] = useState(false);

  const handleChangeFormat = (event) => {
    const { value } = event.target;
    updateFormat(value);
  };

  const handleOpenFormatDropdownMenu = () => {
    setOpenFormatDropdownMenu(true);
  };

  const handleCloseFormatDropdownMenu = () => {
    setOpenFormatDropdownMenu(false);
  };

  return (
    <Box>
      <InputLabel
        id="itemFormat"
        sx={{
          color: "primary.dark",
          fontWeight: 520,
          fontSize: { xs: "1rem", md: "1.1rem" },
          lineHeight: "100%",
        }}
      >
        Format
      </InputLabel>
      <TextField
        name="itemFormat"
        required
        select
        hiddenLabel
        value={format}
        onChange={handleChangeFormat}
        slotProps={{
          select: {
            multiple: false,
            renderValue: (selected) => selected,
            open: openFormatDropdownMenu,
            onOpen: handleOpenFormatDropdownMenu,
            onClose: handleCloseFormatDropdownMenu,
            IconComponent: KeyboardArrowRightIcon,
            MenuProps: {
              disableScrollLock: true,
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
          width: { xs: "100%", sm: "50%", md: "40%", lg: "20%" },
          "& .MuiOutlinedInput-input": {
            padding: 0,
          },
          "& .MuiOutlinedInput-root": {
            display: "flex",
            padding: { xs: "8px 16px" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: "4px",
            backgroundColor: "#E9E9E9",
            borderRadius: "8px",
            "& .MuiOutlinedInput-notchedOutline": { border: "none" },
            "& .MuiInputBase-input": {
              "&.MuiOutlinedInput-input": {
                fontSize: { xs: "1rem", md: "1.1rem" },
                padding: 0,
                display: "flex",
                alignItems: "center",
              },
            },
          },
          "& .MuiSvgIcon-root": {
            position: "initial",
            fontSize: { xs: "1.8rem" },
            transform: openFormatDropdownMenu && "rotate(90deg)",
          },
        }}
      >
        {["Anime", "Manga"].map((type) => (
          <MenuItem key={type} value={type}>
            <ListItemText primary={type} />
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}

export default ReviewFormat;
