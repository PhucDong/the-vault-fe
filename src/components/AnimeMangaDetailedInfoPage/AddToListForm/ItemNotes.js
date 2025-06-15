import { Box, InputLabel, TextField } from "@mui/material";
import React from "react";
import AddToListFormLabel from "./AddToListFormLabel";

function ItemNotes(props) {
  const { itemNotes, setItemNotes, sx } = props;

  const handleChangeItemNotes = (event) => setItemNotes(event.target.value);

  return (
    <Box sx={sx}>
      <AddToListFormLabel htmlFor="item-notes">Notes</AddToListFormLabel>
      <TextField
        fullWidth
        id="item-notes"
        multiline
        minRows={2}
        value={itemNotes}
        onChange={handleChangeItemNotes}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            "& .MuiOutlinedInput-input": {
              color: "primary.main",
              fontSize: { xs: "0.9rem", sm: "1rem" },
              lineHeight: 1.35,
            },
          },
        }}
      />
    </Box>
  );
}

export default ItemNotes;
