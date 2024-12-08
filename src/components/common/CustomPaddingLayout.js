import { Box } from "@mui/material";

function CustomPaddingLayout(props) {
  const { children, sx, ...other } = props;

  // Filter out unwanted props
  const {
    fullWidth,
    selectionFollowsFocus,
    textColor,
    indicator,
    ...filteredProps
  } = other;

  return (
    <Box
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
