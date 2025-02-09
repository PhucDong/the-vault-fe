import {
  Box,
  InputLabel,
  ListItemText,
  MenuItem,
  TextField,
} from "@mui/material";
import { useAppSelector, useReviewAppDispatch } from "../../services/hooks";
import {
  selectReviewTitleList,
} from "../../store/slices/review/reviewSlice";
import { useState } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useSelector } from "react-redux";

function ReviewTitle(props) {
  const { errors, setErrors } = props;
  const titleList = useAppSelector(selectReviewTitleList);
  const title = useSelector((state) => state.review.title);
  const { updateTitle, updateTitleId } = useReviewAppDispatch();
  const [openTitleDropdownMenu, setOpenTitleDropdownMenu] = useState(false);

  const handleOpenTitleDropdownMenu = () => {
    setOpenTitleDropdownMenu(true);
  };

  const handleCloseTitleDropdownMenu = () => {
    setOpenTitleDropdownMenu(false);
  };

  const handleChangeTitle = (selectedTitle) => {
    if (selectedTitle) {
      console.log("Selected title: ", selectedTitle);
      setErrors({ ...errors, title: "" });
      updateTitleId(selectedTitle._id);
      if (title === selectedTitle.title) {
        updateTitle("");
      } else {
        updateTitle(selectedTitle.title);
      }
    }
  };

  return (
    <Box>
      <InputLabel
        htmlFor="title"
        sx={{
          color: "primary.dark",
          fontWeight: 520,
          fontSize: { xs: "1rem", md: "1.1rem" },
          lineHeight: "100%",
        }}
      >
        Title
      </InputLabel>
      <TextField
        id="title"
        required
        select
        hiddenLabel
        value={title}
        error={!!errors.title}
        helperText={errors.title}
        slotProps={{
          select: {
            multiple: false,
            renderValue: (selected) => selected,
            open: openTitleDropdownMenu,
            onOpen: handleOpenTitleDropdownMenu,
            onClose: handleCloseTitleDropdownMenu,
            IconComponent: KeyboardArrowRightIcon,
            MenuProps: {
              disableScrollLock: true,
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
                    padding: "8px 20px",
                    minHeight: "100%",
                    gap: "4px",
                    "& .MuiCheckbox-root": {
                      padding: 0,
                    },
                    "& .MuiTypography-root": {
                      fontSize: "0.95rem",
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
          textField: {
            id: "season-filter",
            name: "season-filter",
            fullWidth: true,
            placeholder: "",
            InputProps: {
              onClick: handleOpenTitleDropdownMenu,
              sx: {
                cursor: "pointer",
              },
            },
          },
        }}
        sx={{
          width: "100%",
          "& .MuiOutlinedInput-input": {
            padding: 0,
          },
          "& .MuiOutlinedInput-root": {
            cursor: "pointer",
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
                cursor: "inherit",
                fontSize: { xs: "1rem", md: "1.1rem" },
                padding: 0,
                display: "flex",
                alignItems: "center",
                textTransform: "capitalize",
              },
            },
          },
          "& .MuiFormHelperText-root": {
            margin: { xs: "4px 0 0 0", sm: "6px 0 0 0" },
            marginBottom: {
              xs: errors.message && "8px",
              sm: errors.message && "12px",
            },
            lineHeight: { xs: 1.25, sm: "100%" },
            fontWeight: 550,
            fontSize: { xs: "0.8rem", sm: "0.9rem" },
          },
          "& .MuiSvgIcon-root": {
            position: "initial",
            fontSize: { xs: "1.8rem" },
            transform: openTitleDropdownMenu && "rotate(90deg)",
          },
        }}
      >
        {titleList?.map((option) => (
          <MenuItem
            key={option.title}
            value={option.title}
            onClick={() => handleChangeTitle(option)}
          >
            <ListItemText
              primary={option.title}
              sx={{
                "& .MuiTypography-root": {
                  textTransform: "capitalize",
                },
              }}
            />
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}

export default ReviewTitle;
