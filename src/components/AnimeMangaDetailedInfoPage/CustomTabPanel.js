import { Box } from "@mui/material";
import DetailedItemHighlight from "./DetailedItemHighlight";
import DetailedItemExtraInfo from "./DetailedItemExtraInfo";

function CustomTabPanel(props) {
  const { children, value, index, item, ...other } = props;

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
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      sx={{
        padding: { md: "0 152px", lg: "0 192px" },
        display: { xs: "block", md: "flex" },
        gap: { md: "32px" },
      }}
      {...filteredProps}
    >
      {/* Right column */}
      {value === index && (
        <>
          {/* Left column */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <DetailedItemHighlight item={item} />
            <DetailedItemExtraInfo item={item} />
          </Box>
          {children}
        </>
      )}
    </Box>
  );
}

export default CustomTabPanel;
