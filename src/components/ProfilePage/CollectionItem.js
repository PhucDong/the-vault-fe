import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";
import apiService from "../../services/apiService";
import AddToCollectionForm from "../AnimeMangaDetailedInfoPage/AddToCollectionForm/AddToCollectionForm";
import DeleteCollectionAlert from "./DeleteCollectionAlert";
import CollectionItemAction from "./CollectionItemAction";

function CollectionItem(props) {
  const { item } = props;
  const navigate = useNavigate();
  const [openEditCollection, setOpenEditCollection] = useState(false);
  const [openCollectionDeleteAlert, setOpenCollectionDeleteAlert] =
    useState(false);
  const [savedCollection, setSavedCollection] = useState(null);
  const { isTokenExpired } = useUser();

  const handleOpenEditCollection = () => {
    setOpenEditCollection(true);
  };

  const handleItemInCollection = (item) => {
    if (item.format === "Animes") {
      navigate(`/animes/${item.itemId._id}`);
    } else if (item.format === "Mangas") {
      navigate(`/mangas/${item.itemId._id}`);
    }
  };

  const handleOpenDeleteCollectionAlert = () => {
    setOpenCollectionDeleteAlert(true);
    setOpenEditCollection(false);
  };

  const handleCloseDeleteCollectionAlert = () => {
    setOpenCollectionDeleteAlert(false);
  };

  useEffect(() => {
    const fetchSavedCollection = async () => {
      let itemResponse;
      let foundSavedCollection;

      if (item.format === "Animes") {
        itemResponse = await apiService.get(`/animes/${item.itemId._id}`);
        foundSavedCollection = itemResponse.anime.collections.find(
          (collection) =>
            collection.itemId === item.itemId._id &&
            collection.userId === isTokenExpired.currentUserId
        );
      } else if (item.format === "Mangas") {
        itemResponse = await apiService.get(`/mangas/${item.itemId._id}`);
        foundSavedCollection = itemResponse.manga.collections.find(
          (collection) =>
            collection.itemId === item.itemId._id &&
            collection.userId === isTokenExpired.currentUserId
        );
      }
      setSavedCollection(foundSavedCollection);
    };

    if (openEditCollection || openCollectionDeleteAlert) {
      fetchSavedCollection();
    }
  }, [
    item,
    isTokenExpired.currentUserId,
    openEditCollection,
    openCollectionDeleteAlert,
  ]);

  return (
    <Box
      key={item.itemId.title}
      sx={{
        display: "flex",
        alignItems: "center",
        border: "1px solid #EFEFEF",
        borderRadius: "8px",
        width: "100%",
        minWidth: "0",
        maxWidth: "100%",
        overflow: "hidden",
        flexWrap: "nowrap", // ensure truncation works
      }}
    >
      <Box
        sx={{
          width: "108px",
          height: "108px",
          borderRadius: "8px",
          flexShrink: 0,
          "&:hover": {
            cursor: { md: "pointer" },
          },
        }}
        onClick={() => handleItemInCollection(item)}
      >
        <img
          src={item.itemId.cardImg}
          alt={item.itemId.title}
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            borderRadius: "8px",
          }}
        />
      </Box>

      <Box sx={{ padding: "8px", flex: 1, minWidth: 0 }}>
        <Typography
          sx={{
            fontSize: "1.1rem",
            fontWeight: 550,
            lineHeight: 1.25,
            marginBottom: { xs: "6px" },
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            "&:hover": {
              cursor: { md: "pointer" },
              textDecoration: { md: "underline" },
            },
          }}
          onClick={() => handleItemInCollection(item)}
        >
          {item.itemId.title}
        </Typography>
        <Typography sx={{ fontSize: "0.95rem", color: "#70787A" }}>
          {`Score: ${
            item.itemId.score > 0 ? `${item.itemId.score}/10` : "N/A"
          }`}
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: { xs: "8px" },
            marginTop: { xs: "12px" },
          }}
        >
          {["Edit", "Delete"].map((action) => (
            <CollectionItemAction
              key={action}
              label={action}
              action={
                action === "Edit"
                  ? handleOpenEditCollection
                  : handleOpenDeleteCollectionAlert
              }
            />
          ))}

          {openEditCollection && (
            <AddToCollectionForm
              item={item.itemId}
              openAddToCollection={openEditCollection}
              setOpenAddToCollection={setOpenEditCollection}
              savedCollection={savedCollection}
              handleOpenDeleteCollectionAlert={handleOpenDeleteCollectionAlert}
            />
          )}

          {openCollectionDeleteAlert && (
            <DeleteCollectionAlert
              savedCollection={savedCollection}
              openCollectionDeleteAlert={openCollectionDeleteAlert}
              handleCloseDeleteCollectionAlert={
                handleCloseDeleteCollectionAlert
              }
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default CollectionItem;
