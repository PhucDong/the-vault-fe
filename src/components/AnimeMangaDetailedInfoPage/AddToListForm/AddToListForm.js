import { Box, Button, Modal, Typography } from "@mui/material";
import ItemStatus from "./ItemStatus";
import { useState } from "react";
import dayjs from "dayjs";
import ItemStateDate from "./ItemStateDate";
import ItemFinishDate from "./ItemFinishDate";
import ItemNotes from "./ItemNotes";

function AddToListForm(props) {
  const { openAddToList, setOpenAddToList, itemTitle } = props;
  const handleCloseAddToListModal = () => setOpenAddToList(false);

  const [itemStatusOption, setItemStatusOption] = useState("");
  const [itemStartDate, setItemStartDate] = useState(null);
  const [itemFinishDate, setItemFinishDate] = useState(null);
  const [itemNotes, setItemNotes] = useState("");

  return (
    <Modal
      open={openAddToList}
      onClose={handleCloseAddToListModal}
      aria-labelledby="addToList-modal-title"
      aria-describedby="addToList-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "316px", sm: "352px", md: "364px" },
          bgcolor: "background.paper",
          borderRadius: "8px",
          boxShadow: 24,
          p: 4,
          "& .MuiTypography-root": {
            lineHeight: 1.35,
            marginBottom: "20px",
            fontSize: { xs: "1.1rem", sm: "1.2rem" },
            fontWeight: 550,
          },
        }}
      >
        <Typography
          id="addToList-modal-title"
          sx={{
            fontSize: "1.5rem",
            fontWeight: 600,
            textAlign: { xs: "left", md: "center" },
            marginBottom: "32px",
          }}
        >
          {itemTitle}
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <ItemStatus
            itemStatusOption={itemStatusOption}
            setItemStatusOption={setItemStatusOption}
          />

          <ItemStateDate
            itemStartDate={itemStartDate}
            setItemStartDate={setItemStartDate}
          />

          <ItemFinishDate
            itemFinishDate={itemFinishDate}
            setItemFinishDate={setItemFinishDate}
          />

          <ItemNotes itemNotes={itemNotes} setItemNotes={setItemNotes} />

          <Button
            sx={{
              lineHeight: "100%",
              padding: { xs: "8px 12px", sm: "8px 16px", md: "12px 20px" },
              textTransform: "capitalize",
              fontSize: { xs: "1.1rem", sm: "1.2rem" },
              width: { xs: "100%" },
              backgroundColor: "info.main",
              color: "#fff",
            }}
            onClick={() => console.log("Saved!")}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default AddToListForm;
