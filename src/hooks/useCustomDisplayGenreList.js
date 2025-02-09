import { useCallback } from "react";
import { useMediaQuery } from "@mui/material";

const useCustomDisplayGenreList = () => {
  const isExtraSmallScreenWidthAndAbove = useMediaQuery((theme) =>
    theme.breakpoints.up("xs")
  );
  const isSmallScreenWidthAndAbove = useMediaQuery((theme) =>
    theme.breakpoints.up("sm")
  );
  const isMediumScreenWidthAndAbove = useMediaQuery((theme) =>
    theme.breakpoints.up("md")
  );
  const isLargeScreenWidthAndAbove = useMediaQuery((theme) =>
    theme.breakpoints.up("lg")
  );

  const getDisplayGenreList = useCallback(
    (selectedGenreList) => {
      if (isLargeScreenWidthAndAbove) {
        if (selectedGenreList.length > 7) {
          return `${selectedGenreList
            .slice(0, 7)
            .map((item) => item)
            .join(", ")} (+ ${selectedGenreList.slice(7).length})`;
        }
        return selectedGenreList.map((item) => item).join(", ");
      } else if (isMediumScreenWidthAndAbove) {
        if (selectedGenreList.length > 5) {
          return `${selectedGenreList
            .slice(0, 5)
            .map((item) => item)
            .join(", ")} (+ ${selectedGenreList.slice(5).length})`;
        }
        return selectedGenreList.map((item) => item).join(", ");
      } else if (isSmallScreenWidthAndAbove && selectedGenreList.length > 4) {
        return `${selectedGenreList
          .slice(0, 4)
          .map((item) => item)
          .join(", ")} (+ ${selectedGenreList.slice(4).length})`;
      } else if (
        isExtraSmallScreenWidthAndAbove &&
        selectedGenreList.length > 3
      ) {
        return `${selectedGenreList
          .slice(0, 3)
          .map((item) => item)
          .join(", ")} (+ ${selectedGenreList.slice(3).length})`;
      }
    },
    [
      isExtraSmallScreenWidthAndAbove,
      isSmallScreenWidthAndAbove,
      isMediumScreenWidthAndAbove,
      isLargeScreenWidthAndAbove,
    ]
  );

  return {
    isExtraSmallScreenWidthAndAbove,
    isSmallScreenWidthAndAbove,
    isMediumScreenWidthAndAbove,
    isLargeScreenWidthAndAbove,
    getDisplayGenreList,
  };
};

export default useCustomDisplayGenreList;
