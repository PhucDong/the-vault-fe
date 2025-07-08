import { Box, Modal, Typography } from "@mui/material";
import ItemStatus from "./ItemStatus";
import { useEffect, useState } from "react";
import ItemStartDate from "./ItemStartDate";
import ItemFinishDate from "./ItemFinishDate";
import ItemNotes from "./ItemNotes";
import useUser from "../../../hooks/useUser";
import { useCollectionDispatch } from "../../../services/hooks";
import dayjs from "dayjs";
import AddToCollectionFormButton from "./AddToCollectionFormButton";

function AddToCollectionForm(props) {
  const {
    openAddToCollection,
    setOpenAddToCollection,
    item,
    savedCollection,
    handleOpenDeleteCollectionAlert,
  } = props;
  const handleCloseAddToListModal = () => setOpenAddToCollection(false);
  const { isTokenExpired } = useUser();
  const { createCollection, updateCollection } = useCollectionDispatch();
  const [itemStatusOption, setItemStatusOption] = useState("");
  const [itemStartDate, setItemStartDate] = useState(null);
  const [itemFinishDate, setItemFinishDate] = useState(null);
  const [itemNotes, setItemNotes] = useState("");

  const handleSaveCollection = async () => {
    if (savedCollection) {
      updateCollection({
        collectionId: savedCollection._id,
        status: itemStatusOption,
        startDate: itemStartDate,
        endDate: itemFinishDate,
        notes: itemNotes,
      });
    } else {
      createCollection({
        format: `${item.format === "TV" ? "Animes" : "Mangas"}`,
        itemId: item.id,
        userId: isTokenExpired.currentUserId,
        status: itemStatusOption,
        startDate: itemStartDate,
        endDate: itemFinishDate,
        notes: itemNotes,
      });
    }

    setOpenAddToCollection(false);
  };

  useEffect(() => {
    if (savedCollection) {
      setItemStatusOption(savedCollection.status);
      setItemStartDate(dayjs(savedCollection.startDate));
      setItemFinishDate(dayjs(savedCollection.endDate));
      setItemNotes(savedCollection.notes);
    }
  }, [savedCollection]);

  return (
    <>
      <Modal
        open={openAddToCollection}
        onClose={handleCloseAddToListModal}
        aria-labelledby="addToList-modal-title"
        aria-describedby="addToList-modal-description"
        disableScrollLock
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
            padding: {
              xs: "20px",
              sm: "24px",
              md: "28px",
              lg: "32px",
              xl: "36px",
            },
            // "& .MuiTypography-root": {
            //   lineHeight: 1.35,
            //   marginBottom: "20px",
            //   fontSize: { xs: "1.1rem", sm: "1.2rem" },
            //   fontWeight: 550,
            // },
          }}
        >
          <Typography
            id="addToList-modal-title"
            sx={{
              fontSize: { xs: "1.3rem", md: "1.4rem", lg: "1.5rem" },
              lineHeight: 1.25,
              fontWeight: 550,
              textAlign: { xs: "left", md: "center" },
              marginBottom: { xs: "20px" },
            }}
          >
            {item.title}
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <ItemStatus
              item={item}
              itemStatusOption={itemStatusOption}
              setItemStatusOption={setItemStatusOption}
            />

            <ItemStartDate
              itemStartDate={itemStartDate}
              setItemStartDate={setItemStartDate}
            />

            <ItemFinishDate
              itemFinishDate={itemFinishDate}
              setItemFinishDate={setItemFinishDate}
            />

            <ItemNotes itemNotes={itemNotes} setItemNotes={setItemNotes} />

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: "4px",
              }}
            >
              <AddToCollectionFormButton onClick={handleSaveCollection}>
                Save
              </AddToCollectionFormButton>

              {/* {savedCollection && ( */}
              <AddToCollectionFormButton
                onClick={handleOpenDeleteCollectionAlert}
              >
                Delete
              </AddToCollectionFormButton>
              {/* )} */}
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default AddToCollectionForm;
