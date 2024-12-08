import CustomPaddingLayout from "../common/CustomPaddingLayout";
import { Box, Typography } from "@mui/material";
import AnimeCharacter from "./AnimeCharacter";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

function DetailedItemCharacterList({ item, tabValue, setTabValue }) {
  const [characterList, setCharacterList] = useState(null);

  const getFilteredCharacterList = useMemo(() => {
    if (item.characters?.length > 0 && characterList) {
      return characterList.filter((character) =>
        item.characters.includes(character.id)
      );
    }
  }, [characterList, item.characters]);

  useEffect(() => {
    fetch("http://localhost:3500/characterList")
      .then((response) => response.json())
      .then((data) => setCharacterList(data));
  }, []);

  return (
    <CustomPaddingLayout
      sx={{
        padding: {
          xs: "20px 32px",
          sm: "28px 56px",
          md: "0",
          lg: "0",
        },
        flex: 1,
      }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: { xs: "8px", sm: "12px", lg: "16px" },
            "& .MuiTypography-root": {
              fontSize: { xs: "1.1rem", sm: "1.2rem" },
              fontWeight: 600,
              color: "primary.main",
            },
            "& a": {
              textDecoration: "none",
              color: "info.main",
              fontWeight: 550,
              lineHeight: "100%",
              fontSize: { xs: "1rem", sm: "1.125rem" },
            },
          }}
        >
          <Typography>Characters</Typography>
          {tabValue === 0 && (
            <Link onClick={() => setTabValue(1)}>View All</Link>
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            flexWrap: { xs: "nowrap", md: "wrap" },
            justifyContent: "space-between",
            gap: "8px",
          }}
        >
          {getFilteredCharacterList && getFilteredCharacterList.length > 0 ? (
            getFilteredCharacterList
              .slice(0, 6)
              .map((animeCharacter, index) => (
                <AnimeCharacter key={index} animeCharacter={animeCharacter} />
              ))
          ) : (
            <Typography sx={{ fontSize: { xs: "0.95rem", sm: "1.1rem" } }}>
              No characters found.
            </Typography>
          )}
        </Box>
      </Box>
    </CustomPaddingLayout>
  );
}

export default DetailedItemCharacterList;
