import { Box, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import { useAnimeAppDispatch, useMangaAppDispatch } from "../../services/hooks";

function CustomStyledFastGenreButton(props) {
  const { value, children, onClick } = props;
  const location = useLocation();
  const animeGenreOptionList = useSelector(
    (state) => state.anime.genreOptionList
  );
  const mangaGenreOptionList = useSelector(
    (state) => state.manga.genreOptionList
  );
  const { updateAnimeGenreOptionList } = useAnimeAppDispatch();
  const { updateMangaGenreOptionList } = useMangaAppDispatch();

  const isFastGenreFilterSelected = () => {
    const isAnimePage =
      location.pathname === "/" || location.pathname.includes("/animes");
    return isAnimePage
      ? animeGenreOptionList.includes(value)
      : mangaGenreOptionList.includes(value);
  };

  const handleRemoveFastGenreFilter = () => {
    const isAnimePage =
      location.pathname === "/" || location.pathname.includes("/animes");
    const updateGenreOptionList = isAnimePage
      ? updateAnimeGenreOptionList
      : updateMangaGenreOptionList;
    const genreOptionList = isAnimePage
      ? animeGenreOptionList
      : mangaGenreOptionList;

    updateGenreOptionList(genreOptionList.filter((genre) => genre !== value));
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: { xs: "4px" },
        backgroundColor: isFastGenreFilterSelected() ? "info.main" : "#fff",
        borderRadius: isFastGenreFilterSelected() ? "8px" : 0,
        padding: isFastGenreFilterSelected() ? { xs: "4px 8px" } : 0,
        cursor: "pointer",
      }}
    >
      <Button
        value={value}
        onClick={onClick}
        sx={{
          padding: 0,
          textTransform: "capitalize",
          lineHeight: "100%",
          minWidth: 0,
          fontSize: { xs: "1rem", lg: "1.1rem" },
          fontWeight: 520,
          color: isFastGenreFilterSelected() ? "#fff" : "primary.main",
          border: "none",
        }}
      >
        {children}
      </Button>
      {isFastGenreFilterSelected() && (
        <ClearIcon
          sx={{
            fontSize: { xs: "1.3rem", lg: "1.4rem" },
            color: "#fff",
            marginBottom: { xs: "-1.6px", lg: "-2px" },
          }}
          onClick={handleRemoveFastGenreFilter}
        />
      )}
    </Box>
  );
}

export default CustomStyledFastGenreButton;
