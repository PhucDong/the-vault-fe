import { Box } from "@mui/material";
import { useEffect, useRef } from "react";

function CustomPaddingLayout(props) {
  const { children, sx, setNavHeight, ...other } = props;
  const navBarRef = useRef(null);

  // Filter out unwanted props
  const {
    fullWidth,
    selectionFollowsFocus,
    textColor,
    indicator,
    ...filteredProps
  } = other;

  useEffect(() => {
    if (navBarRef.current && setNavHeight) {
      setNavHeight(navBarRef.current.offsetHeight);
    }
  }, [setNavHeight]);

  return (
    <Box
      ref={navBarRef}
      sx={{
        padding: {
          xs: "0 32px",
          sm: "0 56px",
          md: "0 152px",
          lg: "0 192px",
        },
        ...sx,
      }}
      {...filteredProps}
    >
      {children}
    </Box>
  );
}

export default CustomPaddingLayout;
