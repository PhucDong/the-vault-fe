import CustomPaddingLayout from "../common/CustomPaddingLayout";
import { Box, Typography } from "@mui/material";
import Character from "./Character";
import { Link } from "react-router-dom";

function DetailedItemCharacterList(props) {
  const { item, tabValue, setTabValue } = props;

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
          {item.characters && item.characters.length > 0 ? (
            item.characters
              .slice(0, 6)
              .map((character, index) => (
                <Character key={index} character={character} />
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
